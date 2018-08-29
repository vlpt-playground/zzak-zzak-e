const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.ssrJs,
  target: 'node', // Node.js 환경에서 실행 될 것이라는것을 명시
  output: {
    path: paths.ssrBuild,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    // 결과물을 node.js 에서 require() 로 불러올 수 있게 해줍니다.
    // Link: https://webpack.js.org/configuration/output/#module-definition-systems
  },
  // 각 확장자들에 대하여 어떻게 처리 할 지 준비하기
  module: {
    rules: [
      {
        // 알맞는 로더를 찾아서 처리하도록 설정
        // 맨 아래에는 file-loader 가 있는데 상단에 일치하는게 없다면
        // file-loader 로 처리
        oneOf: [
          // js 파일을 위한 설정
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              cacheDirectory: true,
            },
          },
          // css 파일을 위한 설정
          {
            test: /\.css$/,
            loader: require.resolve('css-loader/locals'),
            // 뒤에 /locals 를 붙여줘야 실제로 파일을 생성하지 않음.
            // postcss-loader 같은건 생략해도됨.
          },
          // scss 파일을 위한 설정
          {
            test: /\.scss$/,
            use: [
              require.resolve('css-loader/locals'), // 여기도 locals
              require.resolve('sass-loader'),
            ],
          },
          // 이미지 파일들을 위한 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000, // 9.76KB 미만이면 base64 형태로 자바스크립트 안에 포함시킴
              emitFile: false, // 실제로 파일을 생성하지 않음
              name: 'static/media/[name].[hash:8].[ext]',
              // 9.76KB 이상이면 파일을 생성하는데, emitFile 이 false 임으로 그냥 이름만 생성
            },
          },
          // 나머지 파일들을 위한 설정
          // file-loader 를 통하여 파일 경로는 만들지만 실제로 생성하지는 않음
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false, // 실제로 파일을 생성하지 않게 함
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  // 어디에 있는 파일들을 읽을지 명시
  // node_modules 랑 src
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
  },
  // 환경변수 설정해줌
  plugins: [new webpack.DefinePlugin(env.stringified)],
};

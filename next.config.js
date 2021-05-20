module.exports = {
  future: {
    webpack5: true,
  },
  env: {
    HOST: process.env.HOST,
    WS: process.env.WS,
    CHAT_WS: process.env.CHAT_WS,
    COLLABORATE_ROOM_WS: process.env.COLLABORATE_ROOM_WS,
    STRIPE_CLIENT_ID: process.env.STRIPE_CLIENT_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  webpack: (webpackConfig, { isServer }) => {
    const { module } = webpackConfig;
    return {
      ...webpackConfig,
      module: {
        ...module,
        rules: [
          ...module.rules,
          {
            test: /\.(png|gif|jpg|jpeg)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  emitFile: isServer,
                  publicPath: `/_next/static/`,
                  outputPath: `${isServer ? "../" : ""}static/`,
                  name: "[path][name].[ext]",
                },
              },
            ],
          },
        ],
      },
    };
  },
};

//@ts-check
// apps\root\next.config.ts
import { composePlugins, withNx } from './.nx-helpers/compiled.js';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';
// import deps from './package.json' assert { type: 'json' };
const basePath = '/root';
const ROOT_SIMPLE_URL =
  process.env.NEXT_PUBLIC_ROOT_SIMPLE_URL || 'http://localhost:86';

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer, dev) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    simple: `simple@${ROOT_SIMPLE_URL}/_next/static/${location}/remoteEntry.js`,
  };
};
/**
 * @type {import('./.nx-helpers/compiled.js').WithNxOptions}
 */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  basePath,
  env: {
    NEXTAUTH_URL: 'https://qio/root/api/auth',
  },
  webpack(config, options) {
    const { isServer, dev } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'root',
        remotes: {
          ...remotes(isServer, dev),
          reactRepo: `reactRepo@http://localhost:81/jc/remoteEntry.js`,
          remote: `remote@http://localhost:84/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './SignIn': './src/pages/[prefix]/SignIn.tsx',
        },
        shared: {},
        extraOptions: {
          //@ts-ignore
          force: true, // Adding force: true to merge the remote
        }, // Adding empty extraOptions
      }),
    );
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default composePlugins(...plugins)(nextConfig);

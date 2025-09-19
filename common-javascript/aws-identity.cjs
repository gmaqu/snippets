// Utility module to check credentials node is using

const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
(async () => {
  const out = await new STSClient({}).send(new GetCallerIdentityCommand({}));
  console.log(out);
})();

// 1. Export CLI environment variables into the shell session
// export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

// 2. Update AWS SDK client in code to use fromEnv
// const { fromEnv } = require('@aws-sdk/credential-providers');
// credentials: fromEnv()


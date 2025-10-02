#!/bin/bash 

# 1. Login to account 

# 2. Login to  CodeArtifact
aws codeartifact login \
  --tool npm \
  --domain $CODE_ARTIFACT_PACKAGE_DOMAIN \
  --domain-owner $CODE_ARTIFACT_DOMAIN_OWNER \
  --repository $CODE_ARTIFACT_PACKAGE_REPOSITORY

# 3. Download .tgz locally 
npm pack axios@4.5.0 --registry https://registry.npmjs.org/

# 4. Extract .tgz into tmp file
mkdir tmp && tar -xzf axios-4.5.0.tgz -C tmp && cd tmp/package

# (4.1) SOME packages may need to disable certain script stages in package.json, e.g. for axios
vim package.json # remove prepare script
 
# 5. Publish to CodeArtifact 
npm publish --ignore-scripts --registry=$_CODE_ARTIFACT_REPOSITORY

## Check Inspector for Vulnerabilities

1. Navigate to Inspector Findings in the target account.
2. Investigate any critical CVE's for that Java component. Read through the findings for a particular CVE, note the **File path** of the package with the dependency containing a vulnerability.

## Update offending package(s) / dependencies

1. Clone the component repository locally.
2. Cut a feature/ branch off develop.
3. Follow the steps in (TODO - add link to setup reg link) to setup a link to the GitLab Maven Package Registry.
4. Add this to \~/.m2/settings.xml to temporarily disable the maven central fallback, this will flag packages not in the registry, locally instead of waiting on pipelines.

```xml
 <mirrors>
  <mirror>
      <id>project-maven-proxy</id>
      <name>Local proxy of the maven central repo</name>
      <url>https://some-server/api/v4/projects/~/packages/maven/</url>
      <mirrorOf>*</mirrorOf>
  </mirror>
 </mirrors>
```

 5. Update identified package(s) in pom.xml to newer versions containing vulnerability fixes.
 6. Install components dependencies `sudo rm -rf ~/.m2/repository/ && mvn clean install`. If any issues are encountered at this stage see [pitfalls](#pitfalls).
 7. Commit & Push changes to the remote upstream.
 8. The pipeline may fail, due to the GitLab Maven package registry missing new packages. Follow (TODO - add link) to upload new packages.
 9. The pipeline pushes the pre-release app image into a Sandpit ECR.
10. Inspect the image to confirm critical & high CVE's have been resolved.
11. Raise an MR. 

## Pitfalls

### `PKIX path building failed... unable to find valid certification path to requested target`

1. Import the SSL cert .crt from step 3 above.

```shell
sudo keytool -trustcacerts -keystore "${JAVA_HOME}/lib/security/cacerts" \
-storepass changeit -importcert -alias custom-cacert \
-file "/usr/local/share/ca-certificates/custom.crt"
```

Workaround for man in the middle cert issue, if the above step doesn't work: `-Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true`

### `Fatal error compiling: error: release version 21 not supported`

1. Sanity check what Java versions installed on the system (likely 17):

```shell
java -version && ls /usr/lib/jvm/
```

2. Update to Java 21

```shell
curl -LO https://corretto.aws/downloads/latest/amazon-corretto-21-x64-linux-jdk.deb
sudo dpkg --install amazon-corretto-21-x64-linux-jdk.deb
sudo update-alternatives --config java
java -version

echo 'export JAVA_HOME=/usr/lib/jvm/java-21-amazon-corretto' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
mvn -v && mvn compile
```

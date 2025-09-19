# Debugging fluent bit configurations locally

## KLOG format on Kubelet (K8 component not supporting json)

### KLOG: Custom LUA script for merging logs from systemd services

Context: Need to support the klog multiline format of logs. The kubelet binary runs on the EC2 node registered with EKS. That way kubelet has access to workload pods and can report on status, writing logs to the journald process on the node. This is a systemd process and so the input for the fluent bit configuration is systemd. A filter can be configured on this input to go through a multiline parser, it cannot be applied directly on the input.

Preliminary Steps:

1. Start a custom service that logs intermittent logs to journald (see /fluentbit-example/setup-fb-test-service)
2. Run fluent bit container with desired configuration, mounting hosts journal files

``` shell
docker run --rm -it --name fluentbit \
  -v ${PWD}/fluentbit-example/kubelet-fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf \
  -v ${PWD}/fluentbit-example/parsers.conf:/fluent-bit/etc/parsers_custom.conf \
  -v ${PWD}/fluentbit-example/klog-sample.log:/var/log/containers/klog-sample.log \
  -v ${PWD}/fluentbit-example/klog_multiline_merge.lua:/fluent-bit/etc/klog_multiline_merge.lua \
  -v /var/log/journal:/var/log/journal:ro \
  -v /run/log/journal:/run/log/journal:ro \
  -v /etc/machine-id:/etc/machine-id:ro \
  -e FLUENT_BIT_SYSTEMD_DB=/tmp/fluentbit.db \
  fluent/fluent-bit:3.2.4-debug \
  /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf
```

## GitLab

``` shell
docker run  -it --rm --name fluentbit -v ${PWD}/fluentbit-example/gitlab-fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf -v ${PWD}/fluentbit-example/gitlab.json:/var/log/containers/gitlab.json -v ${PWD}/fluentbit-example/parsers.conf:/fluent-bit/etc/parser_custom.conf dcf8a1660a64 /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf
```

``` shell
# To test additional logs:

echo '2025-01-24T16:00:35.863492268Z stderr F {"component": "gitlab","subcomponent":"api_json","method":"GET"}' >> /var/log/containers/gitlab.json
```

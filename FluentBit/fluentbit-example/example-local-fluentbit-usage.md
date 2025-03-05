# Debugging fluent bit configurations locally

# Dataplane Kubelet (multiline klog format)

## tail plugin locally
```
docker run --rm -it --name fluentbit \                                                                         ─╯
        -v ${PWD}/fluentbit-example/kubelet-fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf \
        -v ${PWD}/fluentbit-example/parsers.conf:/fluent-bit/etc/parsers_custom.conf \
        -v ${PWD}/fluentbit-example/klog-sample.log:/var/log/containers/klog-sample.log \
        fluent/fluent-bit:3.2.4-debug \
        /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf
```

## systemd
### 1. Query setup for log file location
``` shell
# Locally a KIND container (kubernetes in docker) can be used to emulate K8
kind create cluster --name test-cluster
# Kubelet process runs on this container, writing binary logs stored by the journal process
docker exec -it b5615b3aa01d sh -c "ps aux | grep kubelet"
docker exec -it b5615b3aa01d sh -c "journalctl -u kubelet --no-pager"
# Binary logs are temporarily stored in memory on the container
docker exec -it test-cluster-control-plane sh -c "journalctl --disk-usage && ls var/log/journal"
```
### 2. Exposing Journald Logs from Kind to Host

``` yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: test-cluster
nodes:
  - role: control-plane
    extraMounts:
      - hostPath: /run/log/journal
        containerPath: /run/log/journal
```

``` shell
kind delete cluster --name test-cluster
kind create cluster --config fluentbit-example/kind-cluster.yaml --name test-cluster
```
### Verify logs are available on host

```
sudo journalctl --directory=/run/log/kind-journal --no-pager -u kubelet
```
### Start Fluent Bit pod with access to Journald

```

```

## GitLab

``` shell
docker run  -it --rm --name fluentbit -v ${PWD}/fluentbit-example/gitlab-fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf -v ${PWD}/fluentbit-example/gitlab.json:/var/log/containers/gitlab.json -v ${PWD}/fluentbit-example/parsers.conf:/fluent-bit/etc/parser_custom.conf dcf8a1660a64 /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf
```

``` shell
# To test additional logs:

echo '2025-01-24T16:00:35.863492268Z stderr F {"component": "gitlab","subcomponent":"api_json","method":"GET"}' >> /var/log/containers/gitlab.json
```

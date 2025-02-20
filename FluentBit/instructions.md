# Useful Commands

- docker run  -it --rm --name fluentbit -v ${PWD}/fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf -v ${PWD}/gitlab.json:/var/log/containers/gitlab.json -v ${PWD}/parsers.conf:/fluent-bit/etc/parser_custom.conf dcf8a1660a64 /fluent-bit/bin/fluent-bit -c /fluent-bit/etc/fluent-bit.conf
- echo '2025-01-24T16:00:35.863492268Z stderr F {"component": "gitlab","subcomponent":"api_json","method":"GET"}' >> /var/log/containers/gitlab.json


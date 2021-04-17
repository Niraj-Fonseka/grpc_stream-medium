FROM envoyproxy/envoy:v1.12.2

COPY envoy-linux.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
CMD ["envoy", "-c", "/etc/envoy/envoy.yaml"]


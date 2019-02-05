# hue setup
* https://discovery.meethue.com/
  * give you the IP of the bridge
  * Press button on bridge and POST to `http://{BRIDGE_PI}/api` with body of
  ```json
  {"devicetype":"my_hue_app#codyrushing"}
  ```
  which will return a username

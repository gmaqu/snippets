-- To run on linux: sudo apt-get lua, lua ${PWD}/klog_multiline_merge.lua OR mount the script into fluentbit

function cb_print(tag, timestamp, record)
  new_record = record
  new_record["tag"] = tag
  return 1, timestamp, new_record
end

fb_klog_buffer = {
  buffer = ""
}
function klog_multiline_merge(tag, timestamp, record)
  local log = record.MESSAGE
  if not log or log == "" then
    return -1, timestamp, {}
  end

  local KLOG_START_PATTERN = "^([TDIWEF])(%d%d)(%d%d)%s(%d+:%d+:%d+%.%d+)%s+(%d+)%s+([%w%p]+)]%s+(.*)"
  local is_new_log = string.find(log, KLOG_START_PATTERN)

  if is_new_log then
    print("New klog detected")
    if fb_klog_buffer.buffer ~= "" then
      local completed_log = fb_klog_buffer.buffer
      fb_klog_buffer.buffer = log
      print("Flush the previous log")
      print(completed_log)
      return 1, timestamp, { log = completed_log }
    else
      -- Looking at the first record
      fb_klog_buffer.buffer = ""
      fb_klog_buffer.buffer = log
    end
  else
    -- Merge log continuation
    print("Merge continuation of log")
    fb_klog_buffer.buffer = fb_klog_buffer.buffer.. " " .. log
  end
  return -1, timestamp, {}
end


-- klog_multiline_merge("someTag", 1744041421.387475013, "E0205 15:18:01.699897    1239 nestedpendingoperations.go:348] Operation failed");
-- klog_multiline_merge("someTag", 1744041421.387475013, "Additional log: some-arguments");
-- klog_multiline_merge("someTag", 1744041421.387475013, "More output");
-- klog_multiline_merge("someTag", 1744041421.387475013, "More");
-- klog_multiline_merge("someTag", 1744041421.387475013, "I0305 10:33:57.808292    1701 reconciler_common.go:162] \"a new log");
-- klog_multiline_merge("someTag", 1744041421.387475013, "some additional bits");
-- klog_multiline_merge("someTag", 1744041421.387475013, "T0304 10:33:57.808292    1701 reconciler_common.go:162] \"another new log");

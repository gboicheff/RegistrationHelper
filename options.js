// Saves options to chrome.storage
function save_options() {
    var add_rmp_links = document.getElementById('add_rmp_links').checked;
    var highlight_easy_classes = document.getElementById('highlight_easy_classes').checked;
    var hide_full_classes = document.getElementById('hide_full_classes').checked;
    chrome.storage.sync.set({
        add_rmp_links: add_rmp_links,
        highlight_easy_classes: highlight_easy_classes,
        hide_full_classes: hide_full_classes
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      add_rmp_links: true,
      highlight_easy_classes: true,
      hide_full_classes: false
    }, function(items) {
      document.getElementById('add_rmp_links').checked = items.add_rmp_links;
      document.getElementById('highlight_easy_classes').checked = items.highlight_easy_classes;
      document.getElementById('hide_full_classes').checked = items.hide_full_classes;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
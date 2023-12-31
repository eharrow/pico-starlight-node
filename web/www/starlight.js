$(document).ready(function() {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible data-auto-dismiss" role="alert">`,
      `   <div>${message}</div>`,
      "   <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>",
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  window.setTimeout(function() {
    $(".alert").alert("close");
  }, 2000);

  $.getJSON("config.json", function(config_json) {
    var $anim = $("#animation");
    $anim.empty().append(function() {
      var options = "";
      $.each(config_json, function(key, value) {
        if (key != "current_animation") {
          options += "<option>" + key + "</option>";
        }
      });
      return options;
    });
    $anim.change(function(event) {
      config_json["current_animation"] = $anim.val();
      $.ajax("/", {
        data: JSON.stringify(config_json),
        contentType: "application/json",
        type: "POST",
        success: function(response) {
          if (!!response["success"]) {
            console.log("Config updated successfully");
            appendAlert("Config updated successfully.  The animation should change within a minute.", "success");
          } else {
            console.error("Error updating config: ", response);
            appendAlert("Error updating config: " + response, "danger");
          }
        },
        error: function(xhr, error, ex) {
          console.error("Error posting config: " + error + ": " + ex);
          appendAlert("Error updating config: " + error + ": " + ex, "danger");
        },
      });
    });
    var current_animation = config_json["current_animation"];
    if (current_animation !== undefined) {
      $anim.val(current_animation);
    }

    // TODO render form to edit config values
  });
});

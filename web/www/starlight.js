$(document).ready(function() {
  $.getJSON("config.json", function(config_json) {
    var $anim = $("#animation");
    $anim.empty().append(function() {
      var options = "";
      $.each(config_json, function(key, value) {
        if (key != "current_animation") {
          options += `<option value="${key}">${key.replaceAll("_", " ")}</option>`;
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
            console.log(`Config updated to ${config_json["current_animation"]}`);
            // appendAlert("Config updated to ${config_json["current_animation"]}.  The animation should change within a minute.", "success");
            toast(
              "Success",
              "Config updated successfully.  The animation should change within a minute",
              toastStyles.success,
            );
          } else {
            console.error("Error updating config: ", response);
            // appendAlert("Error updating config: " + response, "danger");
            toast(
              "Error",
              `Problem updating with the change to ${config_json["current_animation"]}`,
              toastStyles.error,
            );
          }
        },
        error: function(xhr, error, ex) {
          console.error("Error posting config: " + error + ": " + ex);
          // appendAlert("Error updating config: " + error + ": " + ex, "danger");
          toast("Error", "Unable to send the change", toastStyles.error);
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

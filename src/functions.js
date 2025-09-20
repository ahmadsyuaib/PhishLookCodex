(function () {
  "use strict";

  Office.initialize = function () {
    // Initialization logic can remain empty for this minimal add-in.
  };

  /**
   * Generates a placeholder reply suggestion using the subject of the selected message
   * and surfaces it via an informational notification in Outlook.
   * @param {Office.AddinCommands.Event} event
   */
  function onMessageRead(event) {
    var item = Office.context.mailbox.item;
    if (!item || !item.notificationMessages) {
      event.completed();
      return;
    }

    var subject = item.subject ? item.subject.trim() : "";
    if (!subject) {
      subject = "this message";
    }

    var suggestion = "Suggested reply: Thanks for the update about \"" + subject + "\". I'll follow up soon.";

    var notification = {
      type: Office.MailboxEnums.NotificationMessageType.InformationalMessage,
      message: suggestion,
      icon: "icon16",
      persistent: false
    };

    item.notificationMessages.replaceAsync(
      "phishlookcodexSuggestion",
      notification,
      function (asyncResult) {
        if (asyncResult && asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.warn("Unable to show reply suggestion notification:", asyncResult.error);
        }
        // Signal completion of the event so Outlook can continue processing.
        event.completed();
      }
    );
  }

  Office.actions.associate("onMessageRead", onMessageRead);
})();

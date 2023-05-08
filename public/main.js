const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const result = document.getElementById("result");
const honeypot = document.getElementById("spam-check");
const reminderTimeout = 300000; // 5 minutes in milliseconds
let reminderTimer = null;

let requestCount = 0;
$("#copy-result").on("click", function () {
  var resultText = $("#result").text();
  navigator.clipboard
    .writeText(resultText)
    .then(function () {
      alert("Result copied to clipboard!");
    })
    .catch(function () {
      alert("Failed to copy result to clipboard.");
    });
});


$(document).ready(function () {
  let submitCount = 0;
  let isBlocked = false;

  // Check if the user has visited the website before
  const visitedBefore = localStorage.getItem("visitedBefore");
  if (!visitedBefore) {
    // If the user hasn't visited before, redirect them to /welcome
    window.location.href = "/welcome";
    // Set the visitedBefore flag in localStorage
    localStorage.setItem("visitedBefore", true);
    return;
  }
  reminderTimer = setTimeout(function () {
    $("#reminder")
      .addClass("animate")
      .html(
        `<div class="alert alert-info" role="alert"><h3>You have been on this website for some time. Please take a break and stretch!</h3></div>`
      );
  }, reminderTimeout);

  $("#form").submit(function (event) {
    event.preventDefault();
    // Increment submit count
    if (isBlocked) {
      $("#result").html(
        '<p class="text-danger">You have been blocked from submitting the form. Please try again in 5 minutes.</p>'
      );
      return;
    }

    submitCount++;

    if (submitCount >= 1000) {
      isBlocked = true;
      $("#result").html(
        '<p class="text-danger">You have exceeded the maximum number of allowed submissions. Please try again in 5 minutes.</p>'
      );
      setTimeout(function () {
        isBlocked = false;
        submitCount = 0;
      }, 300000); // 5 minutes in milliseconds
      return;
    }
    // Check if the honeypot field is filled out
    if (honeypot.value) {
      // If the honeypot field is filled out, assume the user is a bot and display an error message
      $("#result")
        .addClass("animate")
        .html(
          `<div class="alert alert-danger" role="alert"><h3>Error: Please confirm you are not a bot.</h3></div>`
        );
      // Reject submission
      return;
    }
    var repositoryName = $("#name").val();
    var apiURL =
      "https://api.github.com/search/repositories?q=" + repositoryName;

    $("#result")
      .removeClass("animate")
      .html(
        '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>'
      );
    // Increment request count
    requestCount++;

    $.get(apiURL)
      .done(function (data) {
        if (data.items.length > 0) {
          const repo = data.items[0];
          const creationDate = new Date(repo.created_at).toLocaleDateString();
          const license = repo.license ? repo.license.name : "None";
          const language = repo.language ? repo.language : "Unknown";

          // Get metadata for the repository
          const metadataURL = `https://api.github.com/repos/${repo.full_name}`;
          $.get(metadataURL).done(function (metadata) {
            const email = metadata.owner.email
              ? metadata.owner.email
              : "Unknown";
            const source = metadata.source ? metadata.source.full_name : "None";
            const ipAddress = metadata.network_count
              ? metadata.network_count
              : "Unknown";
            const creator = metadata.owner.login
              ? metadata.owner.login
              : "Unknown";
            const creatorAvatar = metadata.owner.avatar_url
              ? metadata.owner.avatar_url
              : "";

            $("#result")
              .addClass("animate")
              .html(
                `<div class="alert alert-success" role="alert">
          <h3>${repo.full_name} exists!</h3>
          <p>${repo.description}</p>
          <p>Link Repository : <a href="${repo.html_url}" target="_blank">Repository Link</a></p>
          <p>Created: ${creationDate}</p>
          <p>License: ${license}</p>
          <p>Language: ${language}</p>
          <p>Creator: <a href="${metadata.owner.html_url}" target="_blank">${creator}</a></p>
          <p>Creator Avatar: <img src="${creatorAvatar}" alt="Creator Avatar" width="50px"></p>
          <p>Email: ${email}</p>
          <p>Source: ${source}</p>
          <p>IP Address: ${ipAddress}</p>
        </div>`
              );
          });
          $("#copy-result").show(); // show copy button
        } else {
          $("#result")
            .addClass("animate")
            .html(
              `<div class="alert alert-danger" role="alert"><h3>${repositoryName} does not exist.</h3></div>`
            );
        }
      })
      .fail(function () {
        $("#result")
          .addClass("animate")
          .html(
            `<div class="alert alert-danger" role="alert"><h3>${repositoryName} does not exist.</h3></div>`
          );
        $("#copy-result").hide(); // hide copy button
      });
  });
});

// Reset the timer when the user interacts with the page
$(document).on("mousemove click keydown", function () {
  clearTimeout(reminderTimer);
  reminderTimer = setTimeout(function () {
    $("#reminder")
      .addClass("animate")
      .html(
        `<div class="alert alert-info" role="alert"><h3>You have been on this website for some time. Please take a break and stretch!</h3></div>`
      );
  }, reminderTimeout);
});

let pos_prod_pie;
let general_line_chart;
let pos_general_pie;

url_ip = "localhost";
//url_ip = "34.95.147.116";

window.onload = initPage;

function initPage() {
  if ($("#num_texts").text() >= 1) {
    $("#results_button").attr("disabled", false);
    $("#delete_button").attr("disabled", false);
  }
}

function analyze() {
  // Makes results div visible
  $(function () {
    $("#loading").css("visibility", "visible");
  });

  var txt = $("#text_box").val().replaceAll("-", "");
  if (document.getElementById("mtld").checked) {
    var dil = "mtld";
  } else {
    var dil = "hdd";
  }

  console.log(txt);
  console.log(dil);

  $.ajax({
    url: "http://" + url_ip + ":5000/analyze/",
    contentType: "application/json",
    cache: false,
    method: "POST",
    dataType: "json",
    data: JSON.stringify({
      text: txt,
      dil_status: dil,
    }),
    success: function (data) {
      console.log(data);
      //   console.log(dil_status);
      $("#num_texts").text(parseInt($("#num_texts").text()) + 1);
      if ($("#num_texts").text() >= 1) {
        $("#results_button").attr("disabled", false);
        $("#delete_button").attr("disabled", false);
      }
      $("#add_button").attr("disabled", "disabled");
      $(function () {
        $("#loading").css("visibility", "hidden");
      });

      $("#text_box").val("");
    },
  });
}

function initResults() {
  pos_prod_pie = new Chart($("#pos_prod_chart")[0], {
    type: "pie",
    options: { maintainAspectRatio: false, responsive: false },
  });
  general_line_chart = new Chart($("#general_chart")[0], {
    type: "line",
    options: {
      tension: 0.1,
      hoverOffset: 4,
      borderWidth: 4,
      pointHoverRadius: 10,
      maintainAspectRatio: false,
      responsive: false,
    },
  });
  pos_general_pie = new Chart($("#general_pie_chart")[0], {
    type: "pie",
    options: { maintainAspectRatio: false, responsive: false },
  });

  get_stats();

  switch_production();
}

function get_stats() {
  // Makes results div visible
  $(function () {
    $("#loading").css("visibility", "visible");
  });
  $.getJSON({
    url: "http://" + url_ip + ":5000/stats/",
    success: function (data) {
      // General statistics info
      $("#mean_n_words").text(mean(data.n_words).toFixed(2));
      $("#mean_types").text(mean(data.types).toFixed(2));
      $("#mean_dil").text(mean(data.lexicalDiversity).toFixed(2));
      $("#mean_del").text(mean(data.lexicalDensity).toFixed(2));
      $("#mean_subs").text(mean(data.pos_subs).toFixed(2));
      $("#mean_verbs").text(mean(data.pos_verbs).toFixed(2));
      $("#mean_adj").text(mean(data.pos_adj).toFixed(2));
      $("#mean_adv").text(mean(data.pos_adv).toFixed(2));
      $("#mean_pro").text(mean(data.pos_pro).toFixed(2));
      $("#mean_art").text(mean(data.pos_art).toFixed(2));

      $("#median_n_words").text(mean(data.n_words).toFixed(2));
      $("#median_types").text(mean(data.types).toFixed(2));
      $("#median_dil").text(mean(data.lexicalDiversity).toFixed(2));
      $("#median_del").text(mean(data.lexicalDensity).toFixed(2));
      $("#median_subs").text(mean(data.pos_subs).toFixed(2));
      $("#median_verbs").text(mean(data.pos_verbs).toFixed(2));
      $("#median_adj").text(mean(data.pos_adj).toFixed(2));
      $("#median_adv").text(mean(data.pos_adv).toFixed(2));
      $("#median_pro").text(mean(data.pos_pro).toFixed(2));
      $("#median_art").text(mean(data.pos_art).toFixed(2));

      $("#mode_n_words").text(mode(data.n_words)[0]);
      $("#mode_types").text(mode(data.types)[0]);
      $("#mode_dil").text(mode(data.lexicalDiversity)[0].toFixed(2));
      $("#mode_del").text(mode(data.lexicalDensity)[0].toFixed(2));
      $("#mode_subs").text(mode(data.pos_subs)[0]);
      $("#mode_verbs").text(mode(data.pos_verbs)[0]);
      $("#mode_adj").text(mode(data.pos_adj)[0]);
      $("#mode_adv").text(mode(data.pos_adv)[0]);
      $("#mode_pro").text(mode(data.pos_pro)[0]);
      $("#mode_art").text(mode(data.pos_art)[0]);

      $("#sd_n_words").text(sd(data.n_words).toFixed(2));
      $("#sd_types").text(sd(data.types).toFixed(2));
      $("#sd_dil").text(sd(data.lexicalDiversity).toFixed(2));
      $("#sd_del").text(sd(data.lexicalDensity).toFixed(2));
      $("#sd_subs").text(sd(data.pos_subs).toFixed(2));
      $("#sd_verbs").text(sd(data.pos_verbs).toFixed(2));
      $("#sd_adj").text(sd(data.pos_adj).toFixed(2));
      $("#sd_adv").text(sd(data.pos_adv).toFixed(2));
      $("#sd_pro").text(sd(data.pos_pro).toFixed(2));
      $("#sd_art").text(sd(data.pos_art).toFixed(2));

      var lowest_idx = 0;
      lowest_idx = lowest(data.n_words);
      $("#lowest_n_words").text(
        data.n_words[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.types);
      $("#lowest_types").text(
        data.types[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.lexicalDiversity);
      $("#lowest_dil").text(
        data.lexicalDiversity[lowest_idx].toFixed(2) +
          " (T" +
          (lowest_idx + 1) +
          ")"
      );
      lowest_idx = lowest(data.lexicalDensity);
      $("#lowest_del").text(
        data.lexicalDensity[lowest_idx].toFixed(2) +
          " (T" +
          (lowest_idx + 1) +
          ")"
      );
      lowest_idx = lowest(data.pos_subs);
      $("#lowest_subs").text(
        data.pos_subs[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.pos_verbs);
      $("#lowest_verbs").text(
        data.pos_verbs[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.pos_adj);
      $("#lowest_adj").text(
        data.pos_adj[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.pos_adv);
      $("#lowest_adv").text(
        data.pos_adv[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.pos_pro);
      $("#lowest_pro").text(
        data.pos_pro[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );
      lowest_idx = lowest(data.pos_art);
      $("#lowest_art").text(
        data.pos_art[lowest_idx] + " (T" + (lowest_idx + 1) + ")"
      );

      var highest_idx = 0;
      highest_idx = highest(data.n_words);
      $("#highest_n_words").text(
        data.n_words[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.types);
      $("#highest_types").text(
        data.types[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.lexicalDiversity);
      $("#highest_dil").text(
        data.lexicalDiversity[highest_idx].toFixed(2) +
          " (T" +
          (highest_idx + 1) +
          ")"
      );
      highest_idx = highest(data.lexicalDensity);
      $("#highest_del").text(
        data.lexicalDensity[highest_idx].toFixed(2) +
          " (T" +
          (highest_idx + 1) +
          ")"
      );
      highest_idx = highest(data.pos_subs);
      $("#highest_subs").text(
        data.pos_subs[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.pos_verbs);
      $("#highest_verbs").text(
        data.pos_verbs[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.pos_adj);
      $("#highest_adj").text(
        data.pos_adj[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.pos_adv);
      $("#highest_adv").text(
        data.pos_adv[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.pos_pro);
      $("#highest_pro").text(
        data.pos_pro[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );
      highest_idx = highest(data.pos_art);
      $("#highest_art").text(
        data.pos_art[highest_idx] + " (T" + (highest_idx + 1) + ")"
      );

      // Line Chart
      let datasets = [];

      if ($("#n_words_switch").is(":checked")) {
        datasets.push({
          label: "Número de Palavras",
          data: data.n_words,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
        });
      }

      if ($("#types_switch").is(":checked")) {
        datasets.push({
          label: "Vocabulário",
          data: data.types,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
        });
      }

      if ($("#dil_switch").is(":checked")) {
        datasets.push({
          label: "Diversidade Lexical",
          data: data.lexicalDiversity,
          backgroundColor: "rgb(255, 205, 86)",
          borderColor: "rgb(255, 205, 86)",
        });
      }

      if ($("#del_switch").is(":checked")) {
        datasets.push({
          label: "Densidade Lexical",
          data: data.lexicalDensity,
          backgroundColor: "rgb(50, 205, 50)",
          borderColor: "rgb(50, 205, 50)",
        });
      }

      labels = [];
      for (var i = 1; i <= data.types.length; i++) {
        labels.push("T" + i);
      }

      const data_chart = {
        labels: labels,
        datasets: datasets,
      };

      general_line_chart.data = data_chart;
      general_line_chart.update();

      // Pie Chart
      var total_subs = data.pos_subs.reduce((a, b) => a + b, 0);
      var total_verbs = data.pos_verbs.reduce((a, b) => a + b, 0);
      var total_adj = data.pos_adj.reduce((a, b) => a + b, 0);
      var total_adv = data.pos_adv.reduce((a, b) => a + b, 0);
      var total_pro = data.pos_pro.reduce((a, b) => a + b, 0);
      var total_art = data.pos_art.reduce((a, b) => a + b, 0);
      var total_others = data.pos_others.reduce((a, b) => a + b, 0);

      general_pos_labels = ["Substantivos", "Verbos", "Adjetivos", "Advérbios"];
      general_pos_data = [total_subs, total_verbs, total_adj, total_adv];
      general_pos_backgroudColor = [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(50, 205, 50)",
      ];

      if ($("#lexitems_switch").is(":checked") == false) {
        general_pos_labels.push("Pronomes");
        general_pos_data.push(total_pro);
        general_pos_backgroudColor.push("rgb(132, 49, 205)");

        general_pos_labels.push("Artigos");
        general_pos_data.push(total_pro);
        general_pos_backgroudColor.push("rgb(162, 122, 61)");

        general_pos_labels.push("Outros");
        general_pos_data.push(total_others);
        general_pos_backgroudColor.push("rgb(125, 125, 125)");
      }

      const data_pie = {
        labels: general_pos_labels,
        datasets: [
          {
            label: "Comparativo total de itens gramaticais",
            data: general_pos_data,
            backgroundColor: general_pos_backgroudColor,
            hoverOffset: 4,
          },
        ],
      };
      pos_general_pie.data = data_pie;
      pos_general_pie.update();

      document.getElementById("total_subs_count").value = total_subs;
      document.getElementById("total_verbs_count").value = total_verbs;
      document.getElementById("total_adj_count").value = total_adj;
      document.getElementById("total_adv_count").value = total_adv;
      document.getElementById("total_pro_count").value = total_pro;
      document.getElementById("total_art_count").value = total_art;
      document.getElementById("total_others_count").value = total_others;

      // Hide loading
      $(function () {
        $("#loading").css("visibility", "hidden");
      });
    },
  });
}

function switch_production() {
  $(function () {
    $("#loading").css("visibility", "visible");
  });

  $.ajax({
    url: "http://" + url_ip + ":5000/prod_info/",
    contentType: "application/json",
    cache: false,
    method: "POST",
    dataType: "json",
    data: JSON.stringify({
      production: document.getElementById("production").value,
    }),
    success: function (data) {
      //document.getElementById("POS").innerHTML = data.pos;
      document.getElementById("dil").value = data.dil.toFixed(2);
      document.getElementById("del").value = data.del.toFixed(2);
      document.getElementById("n_words").value = data.n_words;
      document.getElementById("types").value = data.types;
      $("#text_box").val(data.text);

      var frequencies = data.frequencies;

      var subs = 0;
      var verbs = 0;
      var adj = 0;
      var adv = 0;
      var pro = 0;
      var art = 0;
      var others = 0;

      let detais_table_data = [];

      for (var wd in frequencies) {
        // wd - word
        // data.pos[wd] - word category
        // frequencies[wd] - word count

        var pos_tag = "";

        if (data.pos[wd] == "N" || data.pos[wd] == "NPROP") {
          pos_tag = "SUBSTANTIVO";
          subs += frequencies[wd];
        } else if (data.pos[wd] == "V" || data.pos[wd] == "VAUX") {
          pos_tag = "VERBO";
          verbs += frequencies[wd];
        } else if (data.pos[wd] == "ADJ") {
          pos_tag = "ADJETIVO";
          adj += frequencies[wd];
        } else if (
          data.pos[wd] == "ADV" ||
          data.pos[wd] == "ADV-KS" ||
          data.pos[wd] == "ADV-KS-REL"
        ) {
          pos_tag = "ADVÉRBIO";
          adv += frequencies[wd];
        } else if (data.pos[wd] == "ART") {
          pos_tag = "ARTIGO";
          art += frequencies[wd];
        } else if (
          data.pos[wd] == "PROADJ" ||
          data.pos[wd] == "PROPESS" ||
          data.pos[wd] == "PROSUB" ||
          data.pos[wd] == "PRO-KS" ||
          data.pos[wd] == "PRO-KS-REL"
        ) {
          pos_tag = "PRONOME";
          pro += frequencies[wd];
        } else if (data.pos[wd] == "PREP") {
          pos_tag = "PREPOSIÇÃO";
          others += frequencies[wd];
        } else if (data.pos[wd] == "KC" || data.pos[wd] == "KS") {
          pos_tag = "CONJUNÇÃO";
          others += frequencies[wd];
        } else {
          pos_tag = "OUTROS";
          others += frequencies[wd];
        }

        detais_table_data.push([wd, pos_tag, frequencies[wd]]);
      }

      document.getElementById("subs_count").value = subs;
      document.getElementById("verbs_count").value = verbs;
      document.getElementById("adj_count").value = adj;
      document.getElementById("adv_count").value = adv;
      document.getElementById("pro_count").value = pro;
      document.getElementById("art_count").value = art;
      document.getElementById("others_count").value = others;

      // pie_chart
      prod_label = ["Substantivos", "Verbos", "Adjetivos", "Advérbios"];
      prod_data = [subs, verbs, adj, adv];
      prod_background = [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(50, 205, 50)",
      ];

      if ($("#lexitems_prod_switch").is(":checked") == false) {
        prod_label.push("Pronomes");
        prod_data.push(pro);
        prod_background.push("rgb(132, 49, 205)");

        prod_label.push("Artigos");
        prod_data.push(pro);
        prod_background.push("rgb(162, 122, 61)");

        prod_label.push("Outros");
        prod_data.push(others);
        prod_background.push("rgb(125, 125, 125)");
      }

      const data_chart = {
        labels: prod_label,
        datasets: [
          {
            label: "Comparativo itens gramaticais",
            data: prod_data,
            backgroundColor: prod_background,
            hoverOffset: 4,
          },
        ],
      };

      pos_prod_pie.data = data_chart;
      pos_prod_pie.update();

      if ($.fn.dataTable.isDataTable("#details_table")) {
        $("#details_table").DataTable().clear();
        $("#details_table").DataTable().destroy();
        $("#details_table").empty();
      }

      $("#details_table").DataTable({
        responsive: true,
        destroy: true,
        data: detais_table_data,
        columns: [
          { title: "Palavra" },
          { title: "Classificação" },
          { title: "Frequência" },
        ],
        language: {
          lengthMenu: "Mostrar _MENU_ palavras por página",
          zeroRecords: "Nada encontrado - Desculpa :(",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "Não há palavras disponíveis",
          infoFiltered: "(filtrado de um total de _MAX_ palavras)",
          search: "Buscar: ",
          thousands: ".",
          loadingRecords: "Carregando...",
          paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior",
          },
        },
      });

      $(function () {
        $("#loading").css("visibility", "hidden");
      });
    },
  });
}

function delete_texts() {
  $(function () {
    $("#loading").css("visibility", "visible");
  });

  $.ajax({
    url: "http://" + url_ip + ":5000/delete/",
    cache: false,
    method: "POST",
    success: function (data) {
      $(function () {
        $("#loading").css("visibility", "hidden");
      });
      $("#num_texts").text(
        parseInt($("#num_texts").text()) - parseInt($("#num_texts").text())
      );
      if ($("#num_texts").text() <= 0) {
        $("#results_button").attr("disabled", "disabled");
        $("#add_button").attr("disabled", "disabled");
        $("#delete_button").attr("disabled", "disabled");
      }
    },
  });
}

function checkText() {
  var txt = $("#text_box").val();

  if (txt.length == 0) {
    $("#add_button").attr("disabled", "disabled");
  } else {
    $("#add_button").attr("disabled", false);
  }
}

// UTILS
//
// Calculating the average/mean
// https://www.sitepoint.com/community/t/calculating-the-average-mean/7302/3
//

/**
 * The "mean" is the "average" you're used to, where you add up all the numbers
 * and then divide by the number of numbers.
 *
 * For example, the "mean" of [3, 5, 4, 4, 1, 1, 2, 3] is 2.875.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated average (or mean) value from the specified
 *     numbers.
 */
function mean(numbers) {
  var total = 0,
    i;
  for (i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return total / numbers.length;
}

/**
 * The "median" is the "middle" value in the list of numbers.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated median value from the specified numbers.
 */
function median(numbers) {
  // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
  var median = 0,
    numsLen = numbers.length;
  numbers.sort();

  if (
    numsLen % 2 ===
    0 // is even
  ) {
    // average of two middle numbers
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    // is odd
    // middle number only
    median = numbers[(numsLen - 1) / 2];
  }

  return median;
}

/**
 * The "mode" is the number that is repeated most often.
 *
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 */
function mode(numbers) {
  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  var modes = [],
    count = [],
    i,
    number,
    maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}

function sd(numbers) {
  //return index;
  avg = mean(numbers);
  result = [].reduce.call(numbers, (m, c) => m + Math.pow(c - avg, 2), 0);
  result = result / numbers.length;
  result = Math.sqrt(result);

  return result;
}

function highest(numbers) {
  //return index;
  return [].reduce.call(numbers, (m, c, i, arr) => (c > arr[m] ? i : m), 0);
}

function lowest(numbers) {
  //return index;
  return [].reduce.call(numbers, (m, c, i, arr) => (c < arr[m] ? i : m), 0);
}

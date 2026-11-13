// あなたのHPを3にする
let playerHP = 3;

// CPUのHPを3にする
let cpuHP = 3;

// ゲームが終わったかどうかを記録する
let finished = false;

// 両方のアバターを通常画像に戻す
function resetAvatars() {
    $("#cpu_avatar").attr("src", "images/cpu-1.png");
    $("#player_avatar").attr("src", "images/anata-1.png");
}

// HPの文字を更新する
function updateHP() {
    // あなたのHPの数に合わせてハートを変更する
    if (playerHP === 3) {
        $("#player_hp").text("♥ ♥ ♥");
    } else if (playerHP === 2) {
        $("#player_hp").text("♥ ♥");
    } else if (playerHP === 1) {
        $("#player_hp").text("♥");
    } else {
        $("#player_hp").text("");
    }

    // CPUのHPの数に合わせてハートを変更する
    if (cpuHP === 3) {
        $("#cpu_hp").text("♥ ♥ ♥");
    } else if (cpuHP === 2) {
        $("#cpu_hp").text("♥ ♥");
    } else if (cpuHP === 1) {
        $("#cpu_hp").text("♥");
    } else {
        $("#cpu_hp").text("");
    }
}

// あなたが出した手の画像を表示する
function showPlayerHand(player) {
    if (player === "グー") {
        $("#player_hand").html('<img src="images/hand_gu.png" alt="グー">');
    } else if (player === "チョキ") {
        $("#player_hand").html('<img src="images/hand_choki.png" alt="チョキ">');
    } else {
        $("#player_hand").html('<img src="images/hand_pa.png" alt="パー">');
    }
}

// CPUが出した手の画像を表示する
function showCpuHand(cpu) {
    if (cpu === "グー") {
        $("#cpu_hand").html('<img src="images/hand_gu.png" alt="グー">');
    } else if (cpu === "チョキ") {
        $("#cpu_hand").html('<img src="images/hand_choki.png" alt="チョキ">');
    } else {
        $("#cpu_hand").html('<img src="images/hand_pa.png" alt="パー">');
    }
}

// 最終的な勝敗が決まったとき
function finishGame() {
    // ゲームが終わったことを記録する
    finished = true;

    // これ以上じゃんけんできないようにする
    $("#gu_btn").prop("disabled", true);
    $("#choki_btn").prop("disabled", true);
    $("#pa_btn").prop("disabled", true);

    // 一回ごとの勝敗文字を消す
    $("#round_result").hide();

    // CPUのHPが0なら「大勝利！」の文字を表示する
    if (cpuHP === 0) {
        $("#result_win").show();
    } else {
        $("#result_lose").show();
    }

    // 最終結果が出たときだけリトライを表示する
    $("#retry_btn").show();
}

// じゃんけんを一回行う
function playJanken(player) {
    // ゲームが終わっていたら処理をしない
    if (finished === false) {
        // 次のターンを始めるときに両方を通常画像に戻す
        resetAvatars();

        // 0、1、2のどれかの数字をランダムに作る
        let random = Math.floor(Math.random() * 3);

        // CPUの手を入れる変数を作る？
        let cpu = "";

        // 数字に応じてCPUの手を決める
        if (random === 0) {
            cpu = "グー";
        } else if (random === 1) {
            cpu = "チョキ";
        } else {
            cpu = "パー";
        }

        // あなたの手を画面に表示する
        showPlayerHand(player);

        // CPUの手を画面に表示する
        showCpuHand(cpu);

        // 同じ手ならあいこ
        if (player === cpu) {
            $("#round_result").text("あいこ！");
        } else if (
            (player === "グー" && cpu === "チョキ") ||
            (player === "チョキ" && cpu === "パー") ||
            (player === "パー" && cpu === "グー")
        ) {
            // あなたが勝ったときはCPUのHPを1減らす
            $("#round_result").text("勝ち！");
            cpuHP = cpuHP - 1;

            // あなたは勝利画像、CPUは敗北画像に変える
            $("#player_avatar").attr("src", "images/anata-2.png");
            $("#cpu_avatar").attr("src", "images/cpu-3.png");
        } else {
            // あなたが負けたときは自分のHPを1減らす
            $("#round_result").text("負け！");
            playerHP = playerHP - 1;

            // CPUは勝利画像、あなたは敗北画像に変える
            $("#cpu_avatar").attr("src", "images/cpu-2.png");
            $("#player_avatar").attr("src", "images/anata-3.png");
        }

        // 減ったHPを画面に反映する
        updateHP();

        // どちらかのHPが0ならゲームを終了する
        if (cpuHP === 0) {
            finishGame();
        } else if (playerHP === 0) {
            finishGame();
        }
    }
}

// グーボタンをクリックしたとき
$("#gu_btn").on("click", function () {
    playJanken("グー");
});

// チョキボタンをクリックしたとき
$("#choki_btn").on("click", function () {
    playJanken("チョキ");
});

// パーボタンをクリックしたとき
$("#pa_btn").on("click", function () {
    playJanken("パー");
});

// リトライボタンをクリックしたとき
$("#retry_btn").on("click", function () {
    // あなたのHPを3に戻す
    playerHP = 3;

    // CPUのHPを3に戻す
    cpuHP = 3;

    // ゲームを再開できる状態にする
    finished = false;

    // ハートを3個ずつ表示する
    updateHP();

    // 両方のアバターを通常画像に戻す
    resetAvatars();

    // 手の表示を最初の状態に戻す
    $("#cpu_hand").text("?");
    $("#player_hand").text("?");

    // 一回ごとの結果を最初の文字に戻す
    $("#round_result").text("いざ勝負！");
    $("#round_result").show();

    // 最終結果を非表示にする
    $("#result_win").hide();
    $("#result_lose").hide();

    // リトライボタンを非表示にする
    $("#retry_btn").hide();

    // じゃんけんのボタンを再び押せるようにする
    $("#gu_btn").prop("disabled", false);
    $("#choki_btn").prop("disabled", false);
    $("#pa_btn").prop("disabled", false);
});

// ページを開いたときにHPを表示する
updateHP();

// 首页文章搜索：输入关键词时，按标题和标签实时过滤
(function () {
    var input = document.getElementById("searchInput");
    var cards = document.querySelectorAll("#postList .post-card");
    var noResult = document.getElementById("noResult");

    if (!input) return;

    input.addEventListener("input", function () {
        var keyword = input.value.trim().toLowerCase();
        var visibleCount = 0;

        cards.forEach(function (card) {
            var title = (card.dataset.title || "").toLowerCase();
            var tags = (card.dataset.tags || "").toLowerCase();
            var matched = title.indexOf(keyword) !== -1 || tags.indexOf(keyword) !== -1;

            card.style.display = matched ? "block" : "none";
            if (matched) visibleCount++;
        });

        noResult.style.display = visibleCount === 0 ? "block" : "none";
    });
})();

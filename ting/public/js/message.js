var home_Path = 'https://yating.online/'
var result = {
    mouseover: [{
            selector: ".link-item",
            text: ["要去——{text}吗？"]
        },
        {
            selector: ".title-box .title",
            text: ["要看看 《{text}》 么？"]
        },
        {
            selector: "img .top",
            text: ["点击回到最顶部哦"]
        },
        {
            selector: ".hide-button",
            text: ["变身~我有瞬间移动的能力~"]
        },
        {
            selector: ".search-box",
            text: ["要搜索什么东西呢，需要帮忙吗？"]
        }
    ],
    click: [{
            selector: ".link-item .router-link-active",
            text: ["你现在在{text}页哦~"]
        },
        {
            selector: "#landlord #live2d",
            text: ["不要动手动脚的！快把手拿开~~", "真…真的是不知羞耻！", "Hentai！", "再摸的话我可要报警了！⌇●﹏●⌇", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"]
        },
        {
            selector: ".tag-box",
            text: ["这些都是我平时积累的笔记呢"]
        }
    ]
}

function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function(word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function(context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function() {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});

function initTips() {
    $.each(result.mouseover, function(index, tips) {
        $(tips.selector).mouseover(function() {
            var text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
                text: $(this).text()
            });
            showMessage(text, 1000);
        });
    });
    $.each(result.click, function(index, tips) {
        $(tips.selector).click(function() {
            var text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
                text: $(this).text()
            });
            showMessage(text, 3000);
        });
    });
}
initTips();

(function() {
    var text;
    if (document.referrer !== '') {
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        } else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        } else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    } else {
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
        } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了！';
        } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
        } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~~';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto, 30000);

function showHitokoto() {
    $.getJSON('https://v1.hitokoto.cn/', function(result) {
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout) {
    $('.message').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d() {
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600);
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d();
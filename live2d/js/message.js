function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
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

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});

$('.waifu-tool .cl-home')
    .click(function() {
        window.location = window.location.protocol + '//' + window.location.hostname + '/'
    });

$('.nv .cl-nv')
    .click(function() {
        loadlive2d('live2d','live2d/model/kesshouban_v2/model.json');
        showMessage('来自工作细胞的血小板~', 5000, true);
        chara = 'kesshouban_v2';
    });
$('.nv .cl-nv2')
    .click(function() {
        loadlive2d('live2d','live2d/model/pio/model0.json');
        showMessage('来自药水工作室的pio酱~', 5000, true);
        chara = 'pio';
    });
$('.nv .cl-nv3')
    .click(function() {
        loadlive2d('live2d','live2d/model/tia/index.json');
        showMessage('Tia酱~', 5000, true);
        chara = 'tia';
    });
$('.nv .cl-nv4')
    .click(function() {
        loadlive2d('live2d','live2d/model/22/index.json');
        showMessage('bilibili 22娘~', 5000, true);
        chara = '22';
    });
$('.nv .cl-nv5')
    .click(function() {
        loadlive2d('live2d','live2d/model/33/index.json');
        showMessage('bilibili 33娘~', 5000, true);
        chara = '33';
    });
$('.nv .cl-nv6')
    .click(function() {
        loadlive2d('live2d','live2d/model/murakumo/index.json');
        showMessage('murakumo酱~', 5000, true);
        chara = 'murakumo';
    });
$('.nv .cl-nv7')
    .click(function() {
        loadlive2d('live2d','live2d/model/kesshouban_v2/model.json');
        showMessage('还是xxb~', 5000, true);
        chara = 'kesshouban_v2';
    });

$('.waifu-tool .cl-liaotianduihua')
    .click(function() {
        showHitokoto();
    });

$('.waifu-tool .cl-nvzhuangqunzi-1')
    .click(function() {
        loadRandModel();
    });

$('.waifu-tool .cl-github1')
    .click(function() {
        window.open('https://github.com/6DDUU6');
    });

$('.waifu-tool .cl-weixin')
    .click(function() {
        showMessage('人家不会告诉你微信号是<span style="font-size:16px;color:orange"> du04171218 </span>φ(>ω<*) ',
            2000, true);
    });

$('.waifu-tool .cl-yincangbukejian')
    .click(function() {
        sessionStorage.setItem('waifu-dsiplay', 'none');
        showMessage('愿你有一天能与重要的人重逢', 1300, true);
        window.setTimeout(function() { $('.waifu').hide(); }, 1300);
    });

$('.waifu-tool .cl-paizhao')
    .click(function() {
        showMessage('照好了嘛，是不是很可爱喵？', 5000, true);
        window.Live2D.captureName = 'Pio.png';
        window.Live2D.captureFrame = true;
    });

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
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
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d ();

function loadRandModel() {
    $.ajax({
        cache: true,
        url: `https://6dduu6.github.io/live2d/model/${chara}/index.json`,
        dataType: "json",
        success: function(result) {
            
            if (result.textures.length == 1 || chara == '22' || chara == '33') {
                showMessage('人家还没有其他衣服呢', 3000, true);
            } else {
                showMessage('人家的新衣服好看喵', 3000, true);
                var ram =Math.floor(Math.random()*result.textures.length)
                console.log(ram)
                loadlive2d('live2d',`live2d/model/${chara}/model${ram.toString()}.json`);
            }
            
        }
    });
}

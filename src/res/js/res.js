// JavaScript Document
/**
 * 文件上传到数据库中，分页实现
 * 
 */

/***************上传文件 保存到数据库中**********************/

$(document).ready(function() {
    var winSize = {
        cHeight: function(height) {
            return (screen.height - height - 160) / 2;
        },
        cWidth: function(width) {
            return (screen.width - width) / 2;
        }
    };

    /***************上传文件****************************/
    $('.file').on('click', function() {
        // $('.upload input').addClass('upClick');
        //console.log("上传");
        // alert("dakai");
        //弹出输入框  上传文件及选择类型 
        $('.uploadbg').css('display', 'block');
        $('.uploadDetial').css('display', 'block');
        //$('.right-area select option').css('font-size','8');
        // 居中,动态
        // var width=document.getElementById("div").style.width;
        var width = $('.uploadDetial').width();
        var height = $('.uploadDetial').height();
        var cW = winSize.cWidth(width);
        var cH = winSize.cHeight(height);
        // console.log(cW+"height:"+cH)
        $('.uploadDetial').css('top', cH);
        $('.uploadDetial').css('left', cW);
    });
    // 关闭按钮
    $(".ulclose").hover(function() {
        $(this).css("cursor", "pointer");
    });
    /*.mouseup(function(){
    			$(this).css("cursor","default");
    		});*/
    $('.ulclose').click(function() {
        $('.uploadbg').css('display', 'none');
        $('.uploadDetial').css('display', 'none');
    });
    //取消
    $('#ulCal').click(function() {
        if (confirm("是否确定取消！")) {
            $('.uploadbg').css('display', 'none');
            $('.uploadDetial').css('display', 'none');
        }
    });
    //确定===>传入数据库
    $('#ulQd').click(function() {
        var uldname = getCookie('username');
        var kcbz = $('#upload_kcbz').val();
        var ssnj = $('#upload_ssnj').val();
        var ssks = $('#upload_ssks').val();
        var wjlx = $('#upload_wjlx').val();
        var bzxx = $('#bzxx').val();
        var date = new Date().toLocaleDateString();
        //console.log(kcbz+"  "+ssnj+"   "+ssks+"   "+wjlx+"   "+ bzxx+"  "+date);
        //判空
        if (kcbz === 0 || ssnj === 0 || ssks === 0) {
            alert("带 * 的为必填项");
            return;
        }

        var files, filePath;
        files = document.getElementById('upfile').files; //filelist
        var filename = "";
        if (files.length !== 0) {
            for (var i = 0; i < files.length - 1; i++) {
                filename += files[i].name + ";";
            }
            filename += files[files.length - 1].name;
            //console.log(filename);
            $('#upstatus').text("正在上传，请稍后......");
        } else {
            // alert("没有文件上传!");
        }
        filePath = ""; //上传服务器的文件夹

        var gUploadFile = new gEcnu.Upload(files, filePath);
        gUploadFile.processAscyn(function() {
            $('#upstatus').text("上传成功!");
            alert('上传成功');
            // kcbz=0;ssnj=0;ssks=0;
            // files=null;
            //置为空
            $('.right-area select option:first-child').prop('selected', 'selected');
            // $('.ultable select).attr('value','0'); 
            $('#upfile').val('');
            $('#upstatus').text('');
            //成功后就关闭窗口
            $('.uploadbg').css('display', 'none');
            $('.uploadDetial').css('display', 'none');
        });
        /***********文件上传End*************************/
        /**************字段存入数据库中********************/
        var params = {
            Fields: ['uldname', 'kcbz', 'ssnj', 'ssks', 'wjlx', 'bzxx', 'date', 'filename'],
            Data: [
                [uldname, kcbz, ssnj, ssks, wjlx, bzxx, date, filename]
            ]
        };
        var sqlServices = new gEcnu.WebSQLServices.SQLServices();
        sqlServices.processAscyn("ADD", "gecp2", "uploadFile", params);

    });

    /*****分页功能**********************/
    $.jqPaginator('#pagination1', {
        totalPages: 100,
        visiblePages: 10,
        currentPage: 3,
        onPageChange: function(num, type) {
            // $('#p1').text(type + '：' + num);
            console.log(type + '：' + num);
            if (type == "init") {
                num = 1;
            }
            getContentDiv(num - 1); /*存放在content.js中*/
        }
    });
    $('#pagination1').jqPaginator('option', {
        currentPage: 1,
        //pageSize:15,
        visiblePages: 7,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>'
    });
    /*****分页功能End**********************/
});

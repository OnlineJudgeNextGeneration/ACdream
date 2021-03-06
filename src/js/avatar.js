var $imgerr = $('#imgerr');
var $file = $('#file');
var $upload = $('#upload');
var $ui = $('.upload_info');

$(document).ready(function(){
  $upload.click(function(){
    if (!$file.val()) {
      errAnimate($imgerr, '请选择文件！');
      return false;
    }
  });
  $file.fileupload({
    dataType: 'json',
    add: function(e, data) {
      var f = data.files[0];
      $ui.text(f.name);
      $upload.unbind('click');
      $upload.click(function(){
        var img_pattern = new RegExp('^.*\.(jpg|jpeg|png)$', 'i');
        if (!img_pattern.test(f.name)) {
          errAnimate($imgerr, '不支持的格式！');
          return false;
        }
        if (f.size && f.size > 2*1024*1024) {
          errAnimate($imgerr, '图片大小不得超过2m！');
          return false;
        }
        showWaitting( $imgerr );
        data.submit();
      });
    },
    progress: function(e, data) {
      var p = parseInt(data.loaded/data.total*100, 10);
      $ui.text(p+'%');
    },
    done: function(e, data) {
      var res = data.response().result;
      if (res.ret === 0) {
        window.location.reload(true);
      } else {
        errAnimate($imgerr, res.msg);
      }
    }
  });
});

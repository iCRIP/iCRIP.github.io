jQuery(document).ready(function($){
  var dictionObj = [];

  var $answers = $('.si_qu_ans');
  var $qus = $('.si_qu');

  $answers.each(function(){
    $(this).on('click', function(){
      var $clicked    = $(this),
          $parent     = $clicked.parent(),
          $wrap       = $parent.parent(),
          quId        = $wrap.attr('id'),
          quTitle     = $wrap.find('.si_qu_title').text(),
          ansVal      = $clicked.data('value'),
          ansText     = $clicked.text();
          

          
          if($parent.hasClass('si_qu_ans-multi')){
            if($clicked.hasClass('si_qu_ans--cont')){
              var $chooses = $clicked.parent().find('.choosed');
              if($chooses.length){
                var multiVal = [];
                for (var i = 0; i < $chooses.length; i++) {
                  var val = $($chooses[i]);
                  multiVal.push(
                    {
                      ansVal: val.data('value'),
                      ansText: val.text()
                    }
                  );
                }
                var quData = {
                                quId:   quId, 
                                title:  quTitle,
                                ans:    multiVal
                              };
                console.log(multiVal)
                checkAnswers(quId, quData);
              }
            }else{
              $clicked.toggleClass('choosed'); 
              var $icon = $clicked.data('value');
              checkIcons($icon)
            }
          }else{
            $clicked.addClass('choosed');
            var quData = {
                                quId:   quId, 
                                title:  quTitle,
                                ans:    [{
                                  ansVal: ansVal,
                                  ansText: ansText
                                }]
                              };
            checkIcons(ansVal);
            checkAnswers(quId, quData);
            
          }
          
    });

  });
  $('.si_form').on('submit', function(){
    var data = [];
    var $inputs = $('.si_form_input');

    for (var i = 0; i < $inputs.length; i++) {
      var el = $($inputs[i]);
      data.push(el.val())
    }
    console.log(data);
    $('.si_form_wrap').removeClass('active').siblings('.si_qu-success').addClass('active')
    $('.si_icons').removeClass('selected');
    var data = collectData()
    console.log(data);
    return false
  });
  $('.si_icon_toggle').on('click', function(){
    var val = $(this).data('value');

    checkIcons(val);
    var $icon = $(this).parent();
    
    
  });
  $('.si_qu_btn').on('click', function(){
    
    $(this).parent().removeClass('active').siblings('.si_form_wrap').addClass('active');
    
  });
  function checkOrder (block){
    var $icon = block;
    if($(window).width() <= 1190){
      if($icon.hasClass('active')){
        $icon.css('order', '1');
        var siblings = $icon.siblings('.active');
        console.log(siblings.css('order'));
        for (var i = 0; i < siblings.length; i++) {
          var $iconCount = $(siblings[i]);
          console.log('sd');
          if(!$iconCount.css('order')){
            $iconCount.css('order', ''+(2+i));
          }else{
            $iconCount.css('order', parseInt($iconCount.css('order'))+1 );
          }
          
        }
      }else{
        $icon.css('order', '');
      }
    }else{
      var $icon = $('.si_icon');
      $icon.css('order', '')
    }
  };
  function checkIcons(val){
    if(val == 'condo'){
      $('#condo').toggleClass('active')
      checkOrder($('#condo'))
      checkToggle($('#condo'))
    };
    if(val == 'home'){
      $('#home').toggleClass('active')
      checkOrder($('#home'))
      checkToggle($('#home'))
    }
    if(val == 'contractor'){
      $('#rain').toggleClass('active')
      checkOrder($('#rain'))
      checkToggle($('#rain'))
    }
    
    if(val == 'SMB bussiness') {
      $('#umbrella').toggleClass('active')
      checkOrder($('#umbrella'))
      checkToggle($('#umbrella'))
    }
    if(val == 'work vehicle'){
      $('#work_veh').toggleClass('active')
      checkOrder($('#work_veh'))
      checkToggle($('#work_veh'))
    }
    if(val == 'drive_yes'){
      $('#veh').toggleClass('active')
      checkOrder($('#veh'))
      checkToggle($('#veh'))
    }
    if(val == 'travel_yes'){
      $('#plain').toggleClass('active')
      checkOrder($('#plain'))
      checkToggle($('#plain'))
    }
    if(val == 'ATVs'){
      $('#quadro').toggleClass('active')
      checkOrder($('#quadro'))
      checkToggle($('#quadro'))
    }
    if(val == 'boat'){
      $('#boat').toggleClass('active')
      checkOrder($('#boat'))
      checkToggle($('#boat'))
    }
    if(val == 'trailers'){
      $('#trailer').toggleClass('active')
      checkOrder($('#trailer'))
      checkToggle($('#trailer'))
    }

  }
  function checkToggle($block){
    if($block.hasClass('active')){
      $block.find('.si_icon_toggle').text('remove')
    }else{
      $block.find('.si_icon_toggle').text('add')
    }
  }
  function checkAnswers(id, data){
    if( id == 'qu_1'){
      data.ans[0].ansVal == 'own' ? $qus.removeClass('active').siblings('#qu_2').addClass('active') : $qus.removeClass('active').siblings('#qu_3').addClass('active').parent().parent().addClass('green');
    }else if(id == "qu_2"){
      $qus.removeClass('active').siblings('#qu_3').addClass('active').parent().parent().addClass('green');
    }else if(id == "qu_3"){
      data.ans[0].ansVal == 'career' ? $qus.removeClass('active').siblings('#qu_4').addClass('active') : $qus.removeClass('active').siblings('#qu_6').addClass('active').parent().parent().addClass('blue');
    }else if(id == "qu_4"){
      data.ans[0].ansVal == 'employee' ? $qus.removeClass('active').siblings('#qu_6').addClass('active').parent().parent().addClass('blue') : $qus.removeClass('active').siblings('#qu_5').addClass('active');      
    }else if(id == "qu_5"){
      $qus.removeClass('active').siblings('#qu_6').addClass('active').parent().parent().addClass('blue');
    }else if(id == "qu_6"){
      $qus.removeClass('active').siblings('#qu_7').addClass('active').parent().parent().addClass('yellow');
    }else if(id == "qu_7"){
      $qus.removeClass('active').siblings('#qu_8').addClass('active').parent().parent().addClass('red');      
    }else if(id == "qu_8"){
      if(data.ans[0].ansVal == 'rec_yes'){
        $qus.removeClass('active').siblings('#qu_9').addClass('active');
      }else{
        $('.si_icons').addClass('selected');
        $qus.removeClass('active').siblings('.si_qu-end').addClass('active').parent().parent().addClass('white').find('.si_modal_title').css('display','none');      
      }
    }else if(id == "qu_9"){
      $('.si_icons').addClass('selected');
      $qus.removeClass('active').siblings('.si_qu-end').addClass('active').parent().parent().addClass('white').find('.si_modal_title').css('display','none');
    }
  }
  function collectData(data){
    var $icons = $('.si_icon.active .si_icon_toggle');
    for (var i = 0; i < $icons.length; i++) {
      var icon = $($icons[i]);
      dictionObj.push({qu_id: icon.data('qu'), val: icon.data('value')});
    }
    return dictionObj;
  }
})
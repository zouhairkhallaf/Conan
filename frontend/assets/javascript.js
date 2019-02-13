function lookupByMessage(){
    $(".results").css({"display":"block"})
    var messageId = $(".messageId").val()
      $.getJSON( `http://Zouhairs-MacBook-Pro-3.local:8000/spectre/${messageId}`, function( data ) {
        $(".message-status").html(        JSON.stringify(data[0].status,                  null, 5) )
        $(".message-boGUID").html(        JSON.stringify(data[0].boGUID,                  null, 5) )
        $(".collapse-0-card-body").html(  JSON.stringify(data[0].ORDER[0],                null, 5) )
        $(".collapse-1-card-body").html(  JSON.stringify(data[0].DRAFT[0],                null, 5) )
        $(".collapse-2-card-body").html(  JSON.stringify(data[0].PRODUCT[0],              null, 5) )
        $(".collapse-3-card-body").html(  JSON.stringify(data[0]["ENVELOPE-RENDER"][0],   null, 5) )
        $(".collapse-4-card-body").html(  JSON.stringify(data[0]["MESSAGE-RENDER"][0],    null, 5) )
        $(".collapse-5-card-body").html(  JSON.stringify(data[0].ENVELOPE[0],             null, 5) )
        $(".collapse-6-card-body").html(  JSON.stringify(data[0].SEAL[0],                 null, 5) )
        $(".collapse-7-card-body").html(  JSON.stringify(data[0].STAMP[0],                null, 5) )
        $(".collapse-8-card-body").html(  JSON.stringify(data[0].DESIGN[0],               null, 5) )
        $(".collapse-9-card-body").html(  JSON.stringify(data[0].PAPER[0],                null, 5) )
        $(".collapse-10-card-body").html( JSON.stringify(data[0]["DESIGN-RENDER"][0],     null, 5) )
        $(".collapse-11-card-body").html( JSON.stringify(data[0].TAG[0],                  null, 5) )
        $(".collapse-12-card-body").html( JSON.stringify(data[0].STATIONERY[0],           null, 5) )
        $(".collapse-13-card-body").html( JSON.stringify(data[0]["SENDER-ADDRESS"][0],    null, 5) )
        $(".collapse-14-card-body").html( JSON.stringify(data[0]["RECIPIENT-ADDRESS"][0], null, 5) )
        $(".collapse-15-card-body").html( JSON.stringify(data[0]["HANDWRITING-STYLE"][0], null, 5) )
        $(".collapse-18-card-body").html( JSON.stringify(data[0]["HPS-IMPORTS"][0],       null, 5) )
        $(".collapse-19-card-body").html( JSON.stringify(data[0]["CPS-IMPORTS"][0],       null, 5) )
      });
      $.getJSON( `http://Zouhairs-MacBook-Pro-3.local:8000/penstation/${messageId}`, function( data ) {
        var PSMESSAGE = data;
        var BATCH = PSMESSAGE[0].BATCH
        delete PSMESSAGE[0].BATCH;
        $(".collapse-16-card-body").html(JSON.stringify(PSMESSAGE[0],                      null, 5) )
        $(".collapse-17-card-body").html(JSON.stringify(BATCH[0],                          null, 5) )
      });
}

function lookupByOrder(){
  return "HI there ///"
}

function hideResutlsTable(){
  $(".results").css({"display":"none"})
}
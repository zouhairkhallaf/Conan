

function lookup(){
    var messageId = $(".messageId").val()
    console.log("messageId: ", messageId) 
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
      });
      $.getJSON( `http://Zouhairs-MacBook-Pro-3.local:8000/penstation/${messageId}`, function( data ) {
        var MESSAGE = [];
        MESSAGE.push(data)
        var BATCH = MESSAGE[0].BATCH
        delete MESSAGE[0].BATCH;
        console.log(BATCH)
        $(".collapse-16-card-body").html(JSON.stringify(MESSAGE[0],                     null, 5) )
        $(".collapse-17-card-body").html(JSON.stringify(BATCH[0],                          null, 5) )
      });
}
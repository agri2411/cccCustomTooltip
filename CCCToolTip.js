        var totals = [];
         // Parsing all the rows and columns in one common array which is not available at Tooltip Format in Pentaho CDE Charts properties.
        _.each(scene.chart().data._datums, function(element) {
          var value = (element.atoms.value.value||0),
              cat =element.atoms.category.label,
              series = element.atoms.series.label;
              totals.push([cat,series,value]);  
        });  

        // Transpose the view based on series which is year and how all 3 years values in one row itself.
        var resultSet=getPivotArrays(totals, 1, ['Cat']);
        
        var tooltipText= resultSet.filter(function (el) {
          return el[0] == c;
        });
         
        var rp=parseInt(tooltipText[0][3]),
            py=parseInt(tooltipText[0][2]),
            py2=parseInt(tooltipText[0][1]);

        //calculating delta variance to show on tooltip with some html formatting.
        var delta  = (py2==0)?0:((py-py2)/py2)*100;
        var delta2 = (rp==0)?0:((rp-py)/py)*100;
        var deltaColor = (delta<0)? 'red':'';
        var delta2Color = (delta2<0)? 'red':'';
        var delta2Text =(delta2==0)?' ':delta2.toFixed(1)+'%'; 
        var reportPeriodVal= (tooltipText[0][3]==0)?' ':tooltipText[0][3];

              
              var html =  '<html>' +
              '<div class="mValue">'+c + ' - '+ s+'</div>' +
                  '<div>'+
                      '<span class="tLabel"> '+Report_Period+' : </span>' +
                      '<span class="tValue"> '+reportPeriodVal+'</span>' +
                  '</div>'+
                  '<div>'+
                      '<span class="tLabel"> '+PY_Period+' : </span>' +
                      '<span class="tValue"> '+tooltipText[0][2]+'</span>' +
                  '</div>'+
                  '<div>'+
                      '<span class="tLabel"> '+PY2_Period+' : </span>' +
                      '<span class="tValue"> '+tooltipText[0][1]+'</span>' +
                  '</div>'+
                  '<div><span> </span></div>'+
                  '<div>'+
                      '<span class="tLabel"> '+deltaLabel+' : </span>' +
                      '<span class="tValue" style="color:'+deltaColor+'">'+delta.toFixed(1)+'%'+'</span>' +
                  '</div>'+
                  '<div>'+
                      '<span class="tLabel"> '+delta2Label+' :  </span>' +
                      '<span class="tValue" style="color:'+delta2Color+'">'+delta2Text+'</span>'+
                  '</div>'+
              '</html>';
              return html;  









                // =============================================== helper   =============================================== 



                                        /**/





// jsoneditor
import 'jsoneditor/dist/jsoneditor.css';   // do not forget CSS !
import JSONEditor from "jsoneditor";

/**/

                                        // tab clicked event
                                        function new_tab_show_callback (){
                                                                                                                    
                                          console.log('showing tab +++++ ' + instance_tabs.index)
                                          
                                          
                                              
                                        }

                                      





                                        function show_info_outline_Tab(_properties_json){

                                         // instance_tabs.select('info_outline');
                                         
                                          $('#jsoneditor_info_outline').show();

                                        

                                        editor_info_outline.set(_properties_json);


                                        editor_info_outline.expandAll();

                                        editor_info_outline.setName(_layer)





                                        }



                                        function show_listTab(_properties_json){

                                         // instance_tabs.select('list');


                                          $('#jsoneditor_list').show();

                                        editor_list.set(_properties_json);


                                        editor_list.expandAll();

                                        editor_list.setName(_layer)


                                        }


                                        function empty_info_outline_Tab(){
                                        $('#jsoneditor_info_outline').hide();
                                        editor_info_outline.set({});
                                        }


                                        function empty_list_Tab(){
                                        $('#jsoneditor_list').hide();
                                        editor_list.set({});
                                        }












                                        
                                       
                                       // init_global_var
                                       var _layer, current_url, current_pathname, current_pathArray, urlParams, _cross, ___url_string, ___url, _center_lat, _center_long, _center_zoom, center, open_tab, base_url, ___protocol, ___hostname, ___pathname, ___urlParams, ___pathArray, ___service;
                                       function init_global_var(){
                                                                    
                                                                    
                                      

                                        //  .......... global var ..............

                                          
                                              // https://developer.mozilla.org/en-US/docs/Web/API/Location

                                                current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;

                                                console.log('current_url ...... ',current_url);
                                                
                                                current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
                                                current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                          // ----- parse url param ?url=xxxxxxxxxx  --------

                                                                  urlParams = new URLSearchParams(window.location.search);

                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  //.................. required parameter .................
                                                                          _layer = urlParams.get('layer'); 
                                                                           if (!(_layer)) {  _layer = 'default' }




                                                                          _cross = urlParams.get('cross'); // optional, without this will be  value 'default'
                                                                          if (_cross) {} else {_cross ='default' }





                                                                          ___url_string = urlParams.get('url');  // required



                                                                        _center_lat = urlParams.get('center_lat');  // required
                                                                        _center_long = urlParams.get('center_long');  // required
                                                                        _center_zoom = urlParams.get('center_zoom');  // required
                                                                        if (_center_lat) {} else {_center_lat = 34 }
                                                                        if (_center_long) {} else {_center_long = -118 }
                                                                        if (_center_zoom) {} else {_center_zoom = 5 }

                                                                  //.................. required parameter .................
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  center={"_center_lat":_center_lat , "_center_long": _center_long};
                                                                    
                                                                  


                                                                  console.log('___url_string ......  ',___url_string)  
                                                                
                                                                      
                                                                    // ***** setting tab parameter *********
                                                                        

                                                                            // url .... &tab='setting'   will enforce open setting cog tab    
                                                                            var param_tab = urlParams.get('tab');
                                                                                if (!(param_tab)) { param_tab = 'info_outline'}
                                                                                console.log('init open tab ---> ',  param_tab)
                                                                                open_tab = param_tab;







                                                                            // basemap=satellite, streets,light,dark,outdoors,none
                                                                              var param_basemapStyle = urlParams.get('basemap');
                                                                              console.log('init base map Style ---> ',  param_basemapStyle)
                                                                              if (param_basemapStyle){
                                                                                  current_basemapStyle = param_basemapStyle
                                                                              }
                                                                            


                                                                    // *****   end    *****   setting tab parameter *********
                                            
                                            
                                            
                                            
                                                              if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                                                              {
                                                                  
                                                                  // nothing to do
                                                                  
                                                              }else{

                                                               
                                                                    ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services


                                                                  base_url = ___url_string;

                                                                  ___protocol = ___url.protocol; //   https:
                                                                  ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                                                                  ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                                                                  ___urlParams = new URLSearchParams(___url.search); //
                                                                  

                                                                  ___pathArray = ___pathname.split('/');


                                                                    // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                                                                    // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]



                                                                  // ___service = https://maps.lacity.org/arcgis/rest/services
                                                                  ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 



                                                                  /*
                                                                    console.log(___url);
                                                                    console.log(___protocol);
                                                                    console.log(___hostname);
                                                                  */ 
                                                                    
                                                              }// if     
                                                      // ----- parse url param ?url=xxxxxxxxxx  --------

                                        }





                                        function dark_mode(){
                                          //  dark mode  https://codepen.io/j_holtslander/pen/MRbpLX




                                                // SWAP ICON ON CLICK
                                                // Source: https://stackoverflow.com/a/34254979/751570
                                                $('.dark-toggle').on('click',function(){
                                                  if ($(this).find('i').text() == 'brightness_4'){
                                                      $(this).find('i').text('brightness_high');
                                                  } else {
                                                      $(this).find('i').text('brightness_4');
                                                  }
                                                });



                                        }








                                        // materialize_init_tab
                                        var init_tabs ,instance_tabs ;
                                        function materialize_init_tab(){

                                          // init all component
                                            //M.AutoInit();


                                            // init materialize tab
                                              var elem = $('.tabs')

                                              // bug, swipeable let height 50% shorter 
                                              //var options = {swipeable: true, duration: 300}
                                              var options = {duration: 600, onShow: new_tab_show_callback}
                                              init_tabs = M.Tabs.init(elem, options);
                                              instance_tabs = M.Tabs.getInstance(elem);


                                              // first time,  open tab, url,   ....&tab=info_outline
                                              instance_tabs.select(open_tab)


                                        }

                                                  







                                                
                                        // init_json_viewer
                                        var container_info_outline, container_list, editor_info_outline, editor_list;    
                                        function init_json_viewer(){

                                                              
                                                  container_info_outline = document.getElementById("jsoneditor_info_outline");
                                                  container_list = document.getElementById("jsoneditor_list");
                                                  // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
                                                  


                                                  console.log('container_info_outline', container_info_outline)




                                                  // options = {sortObjectKeys:true};   // alphabetically sort object key, default is false
                                                  var options = {
                                                                          
                                                      modes:['view'],
                                                      "search": false // remove search box , default is true

                                                    };

                                                  editor_info_outline = new JSONEditor(container_info_outline, options);
                                                  editor_list = new JSONEditor(container_list, options);

                                                }






                                          
                                                function update_url_parameter(_field, _value){
                                                  
                                                  
                                                  // if ((_value) && (_value.length !== 0)) {
              
                                                        console.log("update url parameter: _field _value", _field + " + "+ _value);
              
                                                        var _____searchParams = new URLSearchParams(window.location.search);
                                                        _____searchParams.set(_field, _value);
              
              
                                                        // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                                                        //window.location.search = searchParams.toString();
              
                                                        // instead avoid reload
                                                        var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
                                                        history.pushState(null, '', _____newRelativePathQuery);
                                                  //   }            
              
                                                } 
              



                // =======================  end  ======================== helper   =============================================== 





/**/


            //  +++++++++++++++++++++++++++ legend +++++++++++++++++++++++++++++++++++++++++++

              



                          function getUniqueLayers(layerStyleArray){


                            //  .... js array find unique values  .... 
                                      Array.prototype.unique = function() {
                                        let arr = [];
                                        for(let i = 0; i < this.length; i++) {
                                            if(!arr.includes(this[i])) {
                                                arr.push(this[i]);
                                            }
                                        }
                                        return arr; 
                                      }
                            //  ....  end   ....  js array find unique values  .... 
                            


                            console.log('layerStyleArray', layerStyleArray)

                            var layerNameArray = []
                            for(let j = 0; j < layerStyleArray.length; j++) {
                              layerNameArray.push(layerStyleArray[j]['source-layer'])
                            }

                            const uniqueLayers = layerNameArray.unique()
                            //console.log('uniqueLayers', uniqueLayers)
                            return uniqueLayers


                          }



                          function vectorStyle_toLegent(vectorStyleJson, spriteJson, spritePNG, spriteJson2x,spritePNG2x){


                            var _layersStyle
                            var _legend_html
                            var _uniqueLayers



                              
                                  if (vectorStyleJson.layers){

                                              _legend_html = '<fieldset>'
                                              _legend_html +=  '<legend>'  + _layer +  '</legend>'

                                              _layersStyle = vectorStyleJson.layers

                                              _uniqueLayers = getUniqueLayers(_layersStyle);
                                              console.log('_uniqueLayers', _uniqueLayers)

                                              for (var u = 0; u < _uniqueLayers.length; u++) { 
                                                
                                                      var sourceLayerName = _uniqueLayers[u]
                                                      _legend_html += '<span><strong>' + sourceLayerName + '</strong></span><br/>'

                                                      for (var l = 0; l < _layersStyle.length; l++) { 
                                                

                                                          if (_layersStyle[l]['source-layer'] == sourceLayerName) {

                                                                  //  +++++++  symbology  +++++++  


                                                                            // case (polygon)
                                                                            var symbolType = _layersStyle[l].type
                                                                            var layerID = _layersStyle[l].id 

                                                                            switch(symbolType) {  

                                                                              case "fill":
                                                                                
                                                                                            var fillcolor = _layersStyle[l].paint['fill-color']
                                                                                            var filloutlinecolor = _layersStyle[l].paint['fill-outline-color']

                                                                                            // span works
                                                                                            //_legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="font-size: 1.5em; color:' + fillcolor + ';">' + '<i class="fas fa-square"></i></span>'
                                                                                            // div works by prevent div break into next line by add "display: inline-block;"
                                                                                            _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;  font-size: 1.5em; color:' + fillcolor + ';">' + '<i class="fas fa-square"></i></div>'
                                                                                            
                                                                                break;

                                                                              case "line":
                                                                                                        
                                                                                            var linecolor = _layersStyle[l].paint['line-color']
                                                                                            var linewidth = _layersStyle[l].paint['line-width']

                                                                                            // span works
                                                                                            //_legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></span>'
                                                                                            // div works by prevent div break into next line by add "display: inline-block;"
                                                                                            _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block; font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></div>'
                                                                                            


                                                                                break;



                                                                                case "symbol":
                                                                                                      

                                                                                            /*

                                                                                                // test sprite at http://www.spritecow.com
                                                                                                // prevent div break into next line by add "display: inline-block;"

                                                                                                        <div id='sprite_test' style="background: url(https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/sprites/sprite.png) no-repeat -91px -49px; width:76px;height:48px; display: inline-block;" >
                                                                                                        </div>
                                                                                              
                                                                                                        <div id='sprite_test' style="background: url(https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/sprites/sprite.png) no-repeat -66px 0px; width:136px;height:136px; display: inline-block;" >
                                                                                                        </div>

                                                                                            */






                                                                                              // place holder, later will fill the real sprite image
                                                                                            // _legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="width:10px;height:10px" id="'   + layerID + '"></span>'

                                                                                            var spritePosition = spriteJson[layerID]


                                                                                            




                                                                                            console.log('spritePosition',  layerID,  spritePosition)


                                                                                            // warn: spritePosition undefined
                                                                                            if (spritePosition) {


                                                                                              var spanStyle = 'background: url(' + spritePNG + ') no-repeat -'+ spritePosition.x + 'px -' + spritePosition.y + 'px;   width:' + spritePosition.width + 'px;height:' + spritePosition.height + 'px; display: inline-block;'

                                                                                              // must use div (span, label not work)
                                                                                              _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="' +  spanStyle + '" id="'   + layerID + '"></div>'



                                                                                            }
                                                                                            

                                                                                              
                                                                                break;






                                                                                case "circle":

                                                                                              // https://pro.arcgis.com/en/pro-app/help/mapping/map-authoring/symbology-in-vector-tiles.htm

                                                                                                /*
                                                                                                    "layers": [{

                                                                                                      "id": "xxxxxx", 

                                                                                                      "type":  "circle", 

                                                                                                      "source": "",
                                                                                                      "source-layer": "",
                                                                                                      "layout": {},

                                                                                                        "paint" : {

                                                                                                                    "circle-color" : "#000fff",

                                                                                                                    'circle-opacity': 1,

                                                                                                                    "circle-radius" : {
                                                                                                                                          "property" : "size",
                                                                                                                                          "default" : 6.2,
                                                                                                                                          "stops" : [[2, 2.2], [26, 29.5333]]
                                                                                                                                        }


                                                                                                                  }

                                                                                                    }]        

                                                                                                */



                                                                                              var circlecolor = _layersStyle[l].paint['circle-color']
                                                                                              
                                                                                              // 'far' is circle-hole, 'fas' is solid circle 
                                                                                              _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;  font-size: 1.5em; color:' + circlecolor + ';">' + '<i class="fas fa-circle"></i></div>'
                                                                                              


                                                                                break;







                                                                              default:
                                                                                // code block
                                                                            }




                                                                    //  +++++++   end    +++++++  symbol  +++++++  
                                                                  
                                                                    
                                                                    

                                                                    //    ------  text   ------  

                                                                              /*
                                                                                  {
                                                                                        id: "Block Group/0 - 28 years of age",
                                                                                        type: "fill",
                                                                                        source: "esri",
                                                                                        source-layer: "Block Group",
                                                                                        filter: [
                                                                                        "==",
                                                                                        "_symbol",
                                                                                        2
                                                                                        ],
                                                                                        minzoom: 11.85,
                                                                                        layout: { },
                                                                                        paint: {
                                                                                        fill-color: "#00729A",
                                                                                        fill-outline-color: "#D6D6D6"
                                                                                        }
                                                                                  },
                                                                            

                                                                                  id: top-level-group/sub-group/sub-sub-group/layer 
                                                                                  source-layer: top-level-group

                                                                              */

                                                                              var _id = _layersStyle[l].id
                                                                              var _source_layer = _layersStyle[l]['source-layer']
                                                                              var _id_without_topGroup = _id.replace(_source_layer,'');
                                                                              var displaylayerName = _id_without_topGroup

                                                                              var _id_array = _id.split('/')
                                                                              var _id_array_length = _id_array.length;


                                                                              // we use 'sub-group/sub-sub-group/layer' as layer name, _id_array remove the first element(top-level-group)

                                                                              // span works
                                                                              //_legend_html += '&nbsp;&nbsp;<span>' + _id_array[_id_array_length - 1] + '</span> <br/>'
                                                                              // div works by prevent div break into next line by add "display: inline-block;"

                                                                              if (_id_without_topGroup.length > 0) {
                                                                                        
                                                                                        if (_id_without_topGroup.charAt(0) == '/') {
                                                                                          displaylayerName =  _id_without_topGroup.slice(1)
                                                                                        }
                                                                                      
                                                                              } else {


                                                                                  // _id_without_topGroup is empty, means id is identical to source layer
                                                                                  displaylayerName = _source_layer 
                                                                                
                                                                              }   




                                                                              _legend_html += '&nbsp;&nbsp;<div style="display: inline-block;">' + displaylayerName + '</div> <br/>'





                                                                      //    ------  end    ------ text   ------  


                                                        
                                                          } // if
                                                                                              

                                                      }// for  l  

                                                      _legend_html += '<br/>'
                                                    // break;

                                              }// for  u     

                                              _legend_html += '</fieldset>'

                                              // console.log(' legend html ', _legend_html)

                                              // set html to legend_div
                                              document.getElementById('legend-div').innerHTML = _legend_html

                                  }//if




                          }




                          async function get_vectorTileStyle(_vectorTileServer_url){

                            // https://developers.arcgis.com/rest/services-reference/vector-tile-style.htm
                            // var _vectorStyle_url = _vectorTileServer_url + '/resources/styles'

                            // also works the same way
                            var _vectorStyle_url = _vectorTileServer_url + '/resources/styles/root.json'


                            var _vectorStyle_resourceInfo_url = _vectorTileServer_url + '/resources/info'
                            var _sprite_json_url = _vectorTileServer_url + '/resources/sprites/sprite.json'
                            var _sprite_json2x_url = _vectorTileServer_url + '/resources/sprites/sprite@2x.json'
                            var _sprite_png_url = _vectorTileServer_url + '/resources/sprites/sprite.png'
                            var _sprite_png2x_url = _vectorTileServer_url + '/resources/sprites/sprite@2x.png'

                            


                            console.log(' vectorStyle url :  ',  _vectorStyle_url )
                            console.log(' vectorStyle resourceInfo url :  ',  _vectorStyle_resourceInfo_url)
                            console.log(' sprite json url :  ',  _sprite_json_url )
                            console.log('  sprite png url :  ',  _sprite_png_url )
                            console.log(' sprite json 2x url :  ',  _sprite_json2x_url )
                            console.log('  sprite png 2x url :  ',  _sprite_png2x_url )


                            /* not use ajax, use fetch instead
                            var _vectorStyle_json =  await $.ajax({

                                                // large data take long long time , so should not time out, let it run until get it
                                                // timeout: _timeout,
                                                
                                                type: 'GET',
                                                dataType: 'jsonp',
                                                data: {},
                                                url: _vectorStyle_url,

                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                    
                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                          console.log('ajax error  + ', _error_status);
                                                                        // browsing_message(_error_status) 
                                                  },


                                                  success: function (data) {
                                                            
                                                              // note: data is already json type, you just specify dataType: jsonp
                                                              //  return data;
                                  
                                                  } // success


                            });  // ajax

                            */
                           
                           var _vectorStyle_json = await asyncFetch(_vectorStyle_url)



                             /* not use ajax, use fetch instead

                                var _sprite_json = await  $.ajax({
                                    // large data take long long time , so should not time out, let it run until get it
                                                    // timeout: _timeout,
                                                    
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},
                                                    url: _sprite_json_url,

                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                        
                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                              console.log('ajax error  + ', _error_status);
                                                                            // browsing_message(_error_status) 
                                                      },


                                                      success: function (data) {
                                                                
                                                                  // note: data is already json type, you just specify dataType: jsonp
                                                                  // return data;
                                      
                                                      } // success


                                });  // ajax

                            */
                                                    
                           var _sprite_json = await asyncFetch(_sprite_json_url)




                            console.log('vector style json', _vectorStyle_json)

                            console.log('sprite json', _sprite_json)



                            vectorStyle_toLegent(_vectorStyle_json, _sprite_json, _sprite_png_url, _sprite_json2x_url, _sprite_png2x_url)
                                
                                              



                          }







              //  ++++++++++++++ end +++++++++++++ legend +++++++++++++++++++++++++++++++++++++++++++



/**/





            //  ##########  vector tile    ##########  

                          var root_json;
                          var _sprite;
                          var _glyphs;
                          var _tile_pbf;
                          var original_rootJson;



                          async function asyncFetch(_url___){
                            var response = await fetch(_url___)
                            var responseJson = await response.json();
                            //console.log(' root json --> ', responseJson)
                            return responseJson
                          }

                         async function build_root_json(___url_string) {


                                      var original_rootJson_url = ___url_string + '/resources/styles/root.json'


                                      // ajax not define, must import first, instead use fetch
                                      /*
                                                original_rootJson = await $.ajax({
                                                                                                                        
                                                                                                      type: 'GET',
                                                                                                      dataType: 'jsonp',
                                                                                                      data: {},
                                                                                                      url: original_rootJson_url,

                                                                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                        console.log('ajax error  + ', _error_status);
                                                                                                                            
                                                                                                        },

                                                                                                      success: function (data) {
                                                                                                                    // note: data is already json type, you just specify dataType: jsonp
                                                                                                                    //  return data;
                                                                                                      } // success
                                                                                  });  // ajax
                                      */



                                     original_rootJson = await asyncFetch(original_rootJson_url)




                                      console.log(' original_rootJson_url :  ', original_rootJson_url )
                                      console.log(' original_rootJson :  ', original_rootJson )



                                      _sprite = ___url_string + "/resources/sprites/sprite"
                                      _glyphs = ___url_string + "/resources/fonts/{fontstack}/{range}.pbf"
                                      _tile_pbf = ___url_string + "/tile/{z}/{y}/{x}.pbf"


                                      root_json = {

                                                      "version" : 8,
                                                      "name": "test",

                                                      //"sprite" : original_rootJson.sprite,    // original is not a full URL, not work  "../sprites/sprite"     https://github.com/openlayers/openlayers/issues/6752 
                                                      // "sprite" : "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/sprites/sprite",
                                                      "sprite" : _sprite,

                                                      

                                                      // "glyphs" : original_rootJson.glyphs,      // original is not a full URL, not work  "../fonts/{fontstack}/{range}.pbf"     https://stackoverflow.com/questions/43671343/how-to-display-esri-vector-base-map-in-openlayers-3/65221100#65221100
                                                      // "glyphs" : "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
                                                      "glyphs" : _glyphs,

                                                    

                                                      // root json  specification :   https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
                                                      "sources" : {

                                                                                "esri" : {
                                                                                            "type" : "vector",

                                                                                            //  By supplying TileJSON properties such as "tiles", "minzoom", and "maxzoom" directly in the source:
                                                                                            "tiles": [
                                                                                                          // "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/tile/{z}/{y}/{x}.pbf"
                                                                                                            _tile_pbf
                                                                                                      ],

                                                                                            // "maxzoom": 14
                                                                                            // By providing a "url" to a TileJSON resource
                                                                                            // not work,yet
                                                                                            //  "url" : "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/tile/{z}/{y}/{x}.pbf"
                                                                                            //  "url": "http://api.example.com/tilejson.json"

                                                                                        }
                                                                  },

                                                      "layers":  original_rootJson.layers     


                                      } // root_json
                                      console.log(' root_json :  ', root_json )

                          } // function
                          
                          

              //  ##########    end     ##########    vector tile    ##########  












          
              export {

                  // variable

                        /**/


                           // init_global_var
                           _layer, current_url, current_pathname, current_pathArray, urlParams, _cross, ___url_string, ___url, _center_lat, _center_long, _center_zoom, center, open_tab, base_url, ___protocol, ___hostname, ___pathname, ___urlParams, ___pathArray, ___service,
                 
                           
                           // materialize_init_tab
                           init_tabs ,instance_tabs,



                          // init_json_viewer
                          container_info_outline, container_list, editor_info_outline, editor_list, 



                          //  vector tile 
                          root_json,_sprite,_glyphs,_tile_pbf,original_rootJson,


                       



                 // function

                 
                           

                            update_url_parameter,
                            init_json_viewer,
                            materialize_init_tab,
                            dark_mode,
                            init_global_var,
                            empty_list_Tab,
                            empty_info_outline_Tab,
                            show_listTab,
                            show_info_outline_Tab,
                            new_tab_show_callback,

                            //legend
                            get_vectorTileStyle,
                            vectorStyle_toLegent,
                            getUniqueLayers,

                            // vector tile
                            build_root_json,

                         


              };



        
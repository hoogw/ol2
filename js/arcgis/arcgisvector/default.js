
/*

        arcgisvector, with highlight,  highlight selection feature

        with all label (normal)


*/ 





/*

  highlight vector tile feature:

              Vector Tile Selection (in use)
              https://openlayers.org/en/latest/examples/vector-tile-selection.html


              Select Features by Hover (not use)
              https://openlayers.org/en/latest/examples/select-hover-features.html







          openlayers ,   show  mapbox style



                https://github.com/openlayers/openlayers/issues/6752

               


                our test example:  

               highlight vector tile feature:
               https://codesandbox.io/s/sweet-river-mdjhb?file=/src/index.js



                6.3.0 in use
                https://codesandbox.io/s/gallant-goldstine-dd40f?file=/src/index.js

                6.2.1 , not use, fetch work around
                https://codesandbox.io/s/young-water-uquvh?file=/src/index.js





                    https://codesandbox.io/s/infallible-tdd-h39j9?file=/src/index.js







                  https://github.com/openlayers/ol-mapbox-style

                https://stackoverflow.com/questions/43671343/how-to-display-esri-vector-base-map-in-openlayers-3




                  Vector Tiles on Google Cloud Storage: Web Clients

                  https://support.woolpert.io/hc/en-us/articles/360047005294





openlayers sample : 
                  https://openlayersbook.github.io/ch05-using-vector-layers/example-09.html



*/



/**/


 /* 
        use fetch, must include 'regenerator-runtime/runtime', without this  "parcel" (package bundler) will 'regeneratorRuntime is not defined' error
        // avoid error,  regeneratorRuntime is not defined` error
        // https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
*/
import 'regenerator-runtime/runtime'





import 'ol/ol.css';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import {Control, defaults as defaultControls} from 'ol/control';
import * as olProj from 'ol/proj';


                //  =====  base map   =====   switcher     =====     


                          // https://github.com/walkermatt/ol-layerswitcher#examples

                          // open street map 
                          import OSM from 'ol/source/OSM';
                          import SourceOSM from 'ol/source/OSM';

                          

                          // bing map
                          // sample https://openlayers.org/en/latest/examples/bing-maps.html
                          import BingMaps from 'ol/source/BingMaps';
                          const bingMaps_key = 'AqolQaLKcrqzBFTdehvd2R2JHyocemymF4YyrN0ZFaT9NKGz5AFbEaHiMTlCye2-';






                          //  ----  here map    ----  

                                // sample https://openlayers.org/en/latest/examples/here-maps.html

                                // here map  https://developer.here.com/documentation/map-tile/dev_guide/topics/example-authentication.html

                                var here_apiKey = 'aFfzO1tN4DxEPCkXrb93YHI13mFbXPbUALxeMokWcYk'
                                var appId = 'MIqMFnVN3Bryc2mk6kf2';
                                var appCode = 'MlI0PycHE8NFdd4MrCnhlw';
                                var urlTpl =
                                'https://{1-4}.{base}.maps.cit.api.here.com' +
                                '/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
                                '?app_id={app_id}&app_code={app_code}' +
                                '&apiKey={api_key}';

                                              function createUrl(tpl, layerDesc) {
                                                return tpl
                                                  .replace('{base}', layerDesc.base)
                                                  .replace('{type}', layerDesc.type)
                                                  .replace('{scheme}', layerDesc.scheme)
                                                  .replace('{api_key}', layerDesc.api_key)
                                                  .replace('{app_id}', layerDesc.app_id)
                                                  .replace('{app_code}', layerDesc.app_code);
                                              }

                            //  ----  end   ----   here map    ----  




                          // arcgis 
                          // sample https://openlayers.org/en/latest/examples/xyz-esri-4326-512.html
                          import XYZ from 'ol/source/XYZ';
                          import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';




                          
                          import SourceStamen from 'ol/source/Stamen';

                          import TileLayer from 'ol/layer/Tile';

                          import LayerGroup from 'ol/layer/Group';
                          import LayerImage from 'ol/layer/Image';
                          import LayerTile from 'ol/layer/Tile';

                          import LayerSwitcher from 'ol-layerswitcher';
                          import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
                          import 'ol-layerswitcher/dist/ol-layerswitcher.css';    // do not forget CSS


                //  =====  end  =====  base map   =====   switcher     =====     
                        










import {getBottomLeft, getTopRight} from 'ol/extent';
import {fromLonLat, toLonLat} from 'ol/proj';

import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import View from 'ol/View';



// polygon, line, multi_line, etc.. style are different, see here:   https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
import GeometryType from 'ol/geom/GeometryType';
import {Circle, Fill, Stroke, Style} from 'ol/style';



         
          // *****    ol-mapbox-style  v8.0.5 ***** 

                    /*
                        'import' must follow this
                        https://github.com/openlayers/ol-mapbox-style/issues/536
                    */
                        import apply from 'ol-mapbox-style';
                        import {applyStyle, getLayer, getLayers, recordStyleLayer} from 'ol-mapbox-style';
                                                  
                        /*
                            show properties when user click by Know which layer a feature belongs to  https://github.com/openlayers/ol-mapbox-style/pull/312
                            v6.9.0 only,  v8.0.5 no longer allow import from 'dist' folder, instead import from above single import statement
                            //import { recordStyleLayer } from 'ol-mapbox-style/dist/stylefunction';
                        */  
                        recordStyleLayer(true);  // allow properties window show layer id and etc.
    
              // *****   end  *****    ol-mapbox-style   *****  




//import '@mdi/font/css/materialdesignicons.min.css'




// helper.js 
              import {


                                // variable


/**/
                                  
                                       
                                    
                                        
                                        // materialize_init_tab
                                        init_tabs ,instance_tabs,




                                  
                                      


                              // function

                                          

                                            update_url_parameter,
                                            init_json_viewer,

                                           
                                           
                                            empty_list_Tab,
                                            empty_info_outline_Tab,
                                            show_listTab,
                                            show_info_outline_Tab,
                                            

                                           

                                           

                                           

                
              } from './helper.js'




              var default_center_zoom = 14   


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
                                                  if (_center_zoom) { _center_zoom = Number(_center_zoom).toFixed(2);   } else {_center_zoom = 15 }

                                            //.................. required parameter .................
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            center={"_center_lat":_center_lat , "_center_long": _center_long};
                                              
                                            


                                            console.log('___url_string ......  ',___url_string)  
                                          
                                                
                                            var param_overlayOpacity = urlParams.get('overlayOpacity');
                                            console.log('init overlay Opacity ---> ',  param_overlayOpacity)
                                            if (param_overlayOpacity){
                                                  vectorTile_opacity = parseInt(param_overlayOpacity) / 10 ;
                                            }








                                                      // basemap=satellite, streets,light,dark,outdoors,none
                                                        var param_basemapStyle = urlParams.get('basemap');
                                                        console.log('init base map Style ---> ',  param_basemapStyle)
                                                        if (param_basemapStyle){
                                                            current_basemapStyle = param_basemapStyle
                                                        }
                                                      

                      
                      
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









              var operation_mode = 'hover'    // empty, none    or hover  or  click.  
              // hover, means mouse hover polygon, will automatically open up info_outline panel show attribute info.  
              // click mode means, only when click polygon, will open list panel show attribute info.



              function change_operation_mode(__operationMode__){


                operation_mode = __operationMode__  
                
                $('#info_outline').hide();
                $('#jsoneditor_info_outline').hide();


                $('#list').hide();
                $('#jsoneditor_list').hide();


                switch(__operationMode__) {

                              case 'hover':
                                
                                //$('#close_info_outline_panel').hide()
                                $('#close_info_outline_panel').text('Turn off popup')
                                $('#close_info_outline_panel').css("background-color", 'red');
                                $('#close_info_outline_panel').css("color", 'white');
                                              break;






                              case 'none':

                                              // change from hover to click 
                                          //$('#close_info_outline_panel').show()
                                          $('#close_info_outline_panel').text('Turn on popup')
                                          $('#close_info_outline_panel').css("background-color", 'white');
                                          $('#close_info_outline_panel').css("color", 'black');

                                              break;


                              case '':

                                                // code block
                                                break;


                                
                              default:


                                // code block



                } // switch

              }  // function

 
              function init_user_interface_event(){

               


                $('#close_list_panel').on('click', function(event) {


                            event.preventDefault(); // To prevent following the link (optional)


                            change_operation_mode('hover')
                  
                });



                $('#close_info_outline_panel').on('click', function(event) {

                          event.preventDefault(); // To prevent following the link (optional)
                          var _toggle_popup = $('#close_info_outline_panel').text()
                          
                          if (_toggle_popup == 'Turn off popup'){
                                    
                                      console.log('click mode popup ', _toggle_popup)
                                      change_operation_mode('none')
                                      
                            } else if (_toggle_popup == 'Turn on popup') {
                                      console.log('hover mode popup ', _toggle_popup)
                                      change_operation_mode('hover')
                            }

                  });
                
              }
 
 
  /**/





/**/





            //  ##########  vector tile    ##########  

                          var root_json;
                          var _sprite;
                          var _glyphs;
                          var _tile_pbf;
                          var original_rootJson;
                          var original_rootJson_source_propertyKeyName



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


                                      /*
                                                          -----     -----    sources property could be default 'esri', could be 'custom-name' depends on, must handle accordingly.  -----  -----  -----

                                                                                                            1) hosted/vector tile server  (on arcgis server)
                                                                        
                                                                                                              sources: {
                                                                                                                          esri: {
                                                                                                                                    bounds:[-116.322, 33.5837, -116.225, 33.743]
                                                                                                                                    maxzoom: 23
                                                                                                                                    minzoom: 0
                                                                                                                                    scheme: "xyz"
                                                                                                                                    type: "vector"
                                                                                                                                    url: "../../"




                                                                                                            2) vector tile server (on arcgis online, for example : vectortileservices2.arcgis.com)                        

                                                                                                              sources: {
                                                                                                                          Bike_Trail_Park: {                            (it is not 'esri', must handle it differently)
                                                                                                                                              bounds:[-116.322, 33.5837, -116.225, 33.743]
                                                                                                                                              maxzoom: 23
                                                                                                                                              minzoom: 0
                                                                                                                                              scheme: "xyz"
                                                                                                                                              type: "vector"
                                                                                                                                              url: "../../"
                                                                                              
                                                                                          
                                                                                          
                                                    */
                                                                                                                                              if (original_rootJson.sources){

                                                                                                                                                for (var _itemObject_key in original_rootJson.sources) {
                                                                                                                                                      //console.log(`${property}: ${object[property]}`);
                                                                                                                                                      if ( original_rootJson.sources[_itemObject_key].url ) {
                                                                                                                                                              // "url" exist, or "type" "bounds" exist
                                                                                                                                                                original_rootJson_source_propertyKeyName = _itemObject_key
                                                                                              
                                                                                                                                                                console.log('original_rootJson_source_propertyKeyName', original_rootJson_source_propertyKeyName)
                                                                                              
                                                                                                                                                                break; // break for loop
                                                                                                                                                      }
                                                                                                                                                } // for
                                                                                              
                                                                                                                                              } // if
                                                                                              
                                                                                              
                                                                                                                                      /*  ----- end  -----    sources property could be default 'esri', could be 'custom-name' depends on, must handle accordingly.    -----      */
                                                                                              
                                                                                              
                                                                                              
                                                                                              
                                                                                              
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
                                                                                              
                                                                                                                                                                    /* 
                                                                                                                                                                          property name could be different depends on
                                                                                                                                                                                //  "esri" : {                          //  1) hosted/vector tile server  (on arcgis server)
                                                                                                                                                                                //  "Bike_Trail_Park" : {               //  2) vector tile server (on arcgis online, for example : vectortileservices2.arcgis.com)  
                                                                                                                                                                    */
                                                                                                                                                                    [original_rootJson_source_propertyKeyName] : {    // use variable value as object key:    [variable]: xxx
                                                                                              
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
                                                                                              
                                                                                              
                                                                                              
                                                                                                                                        //before_layer_id = root_json.layers[0].id
                                                                                              
                                                                                                                                        console.log(' root_json :  ', root_json )





                          } // function
                          
                          

              //  ##########    end     ##########    vector tile    ##########  






/**/




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
                                                                              _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;  font-size: 1.5em; background-color:' + fillcolor + ';">' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
                                                                              
                                                                  break;

                                                                case "line":
                                                                                          
                                                                              var linecolor = _layersStyle[l].paint['line-color']
                                                                              var linewidth = _layersStyle[l].paint['line-width']

                                                                              // span works
                                                                              //_legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></span>'
                                                                              // div works by prevent div break into next line by add "display: inline-block;"
                                                                              //_legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block; font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></div>'
                                                                              _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block; font-size: 2em; text-decoration-line: line-through; color:' + linecolor +  ';">' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
                                                                              


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
                                                                                _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;"><span style=" height: 1.5em; width: 1.5em;  background-color:'+  circlecolor + ' border-radius: 50%; display: inline-block;"></span></div>'
                                                                                


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











// --------------  layer opacity  --------------------
                          // can not be in helper.js, map object is not available in helper.js, 
                          // must be in the begining

                                    //  special only for vector tile opacity
                                    
                                    var vectorTile_opacity = 0.6;   // by default 


                                    function set_opacity(_opacity__){

                                      var layers = root_json.layers;
                                      var current_layer_json;
                                      var currentLayer_ol_instance;
                                      var currentlayer_id;

                                            for (var ly = 0; ly < layers.length; ly++) {

                                                        current_layer_json = layers[ly] 

                                                        currentlayer_id = current_layer_json.id;

                                                        console.log('currentlayer_id', currentlayer_id)

                                                        currentLayer_ol_instance = getLayer(map, currentlayer_id)

                                                        currentLayer_ol_instance.setOpacity(_opacity__)

                                            } // for

                                    } 







                                    function init_settingTab(){


                                     


                                      // set init value on html
                                      $('#overlay_opacity_label').text(parseInt(vectorTile_opacity * 10));
                                      $('#overlay_opacity_range').val(parseInt(vectorTile_opacity * 10));

                                    
                                    


                                      $('#overlay_opacity_range').change(function() {

                                              var _overlay_opacity = $('#overlay_opacity_range').val();

                                              $('#overlay_opacity_label').text(_overlay_opacity);

                                              update_url_parameter('overlayOpacity', _overlay_opacity);

                                              vectorTile_opacity = _overlay_opacity / 10;


                                              console.log('vectorTile_opacity --  >' , vectorTile_opacity)
                                              set_opacity(vectorTile_opacity)
                                              

                                      });



                                    }
                    
                            

                    // --------------  end    --------------  layer opacity  --------------------



/**/






              // special for esri vector tile 
              async function pan_to_real_location(){
                /*
                                            -----     -----    sources property could be default 'esri', could be 'custom-name' depends on, must handle accordingly.  -----  -----  -----

                                                                                              1) hosted/vector tile server  (on arcgis server)
                                                          
                                                                                                sources: {
                                                                                                            esri: {
                                                                                                                       bounds:[-116.322, 33.5837, -116.225, 33.743]
                                                                                                                      maxzoom: 23
                                                                                                                      minzoom: 0
                                                                                                                      scheme: "xyz"
                                                                                                                      type: "vector"
                                                                                                                      url: "../../"




                                                                                              2) vector tile server (on arcgis online, for example : vectortileservices2.arcgis.com)                        

                                                                                                sources: {
                                                                                                            Bike_Trail_Park: {                            (it is not 'esri', must handle it differently)
                                                                                                                                bounds:[-116.322, 33.5837, -116.225, 33.743]
                                                                                                                                maxzoom: 23
                                                                                                                                minzoom: 0
                                                                                                                                scheme: "xyz"
                                                                                                                                type: "vector"
                                                                                                                                url: "../../"
                                                                                 
                                                                             
                                                                             
                */

                if (original_rootJson.sources){

                    var _bounds_array = original_rootJson.sources[original_rootJson_source_propertyKeyName]

                    var _southWest_long = _bounds_array.bounds[0]
                    var _southWest_lat  = _bounds_array.bounds[1]
                    var _northEast_long = _bounds_array.bounds[2]
                    var _northEast_lat  = _bounds_array.bounds[3]
                    _center_lat  =  (_northEast_lat + _southWest_lat) / 2
                    _center_long = (_southWest_long + _northEast_long) / 2
                    
                    console.log(' pan to real location ---->>>>> ', _center_lat, _center_long, _center_zoom)
                                                                  
                    update_url_parameter('center_lat', _center_lat);
                    update_url_parameter('center_long', _center_long);
                    if (( _center_zoom == null ) || ( _center_zoom > 20 ) || ( _center_zoom < 5 )) {
                      _center_zoom =  default_center_zoom
                      update_url_parameter('center_zoom', _center_zoom);
                    }   
                    
                   
                    map.getView().setCenter(olProj.transform([_center_long, _center_lat], 'EPSG:4326', 'EPSG:3857'));
                    map.getView().setZoom(_center_zoom);
                } else {
                     console.log('original rootJson sources esri bounds is not available, so not be able to zoom 2 layer !!!!')
                }  
                                      
              } // pan to real location




/**/






(async function() {
 

                          
              console.log(' ---  ---  ---  =====  document ready  --- ----- ')
                                  

                            

                                init_global_var();
                                init_settingTab()

                                init_json_viewer();
                                init_user_interface_event();
                                change_operation_mode('hover')
                              

                                // must use await to wait until ajax get root.json back
                                await build_root_json(___url_string);

                                // legend -------- get   -------   root.json (style)    -------   
                                get_vectorTileStyle(___url_string)

                              
                                // special for vector tile
                                pan_to_real_location()

              console.log(' ------ end  ------   document ready ----- ')


})();


                          
                       


  /*  for highlight feature polygon only */  
/**/
                       //    *******      *******      *******    arcgis vector layer and style  *******      *******      *******      *******  
/**/

                                                      // lookup for selection objects
                                                      var selection = {};




                                                      // ---- default style  ----  must keep  ---- use -----
                                                                var _stroke = new Stroke({
                                                                                          color: 'rgba(255,255,255,0)', //  transparent
                                                                                          width: 5,
                                                                                        });
                                                                var _fill = new Fill({
                                                                                      color: 'rgba(255,255,255,0)', //  transparent
                                                                                    });
                                                                var _circle =   new Circle({
                                                                                              fill: _fill,
                                                                                              stroke: _stroke,
                                                                                              radius: 1
                                                                                      });   
                                                                // all transparent, no color at all                      
                                                                var plain_style = new Style({
                                                                                        stroke: _stroke,
                                                                                        fill: _fill,
                                                                                        image: _circle
                                                                                  });                              
                                                      // ---- end  ----  default style  ---- 


                                                      /**/

                                                      //  *** *** *** selected style  *** *** ***   
                                                      
                                                           /*
                                                               polygon, multiline, ... style are different see here: 
                                                                            https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
                                                           
                                                           
                                                           */

                                                                            const styles = {};
                                                                            const white = [255, 255, 255, 0.8];
                                                                            const blue = [0, 153, 255, 0.8];
                                                                            const width = 10;

                                                                            styles[GeometryType.POLYGON] = [
                                                                              new Style({
                                                                                fill: new Fill({
                                                                                  color: [255, 255, 255, 0.5],
                                                                                }),
                                                                                //zIndex: 3000,
                                                                              }),
                                                                            ];

                                                                            styles[GeometryType.MULTI_POLYGON] = styles[GeometryType.POLYGON];
                                                                           
                                                                            styles[GeometryType.LINE_STRING] = [
                                                                              new Style({
                                                                                stroke: new Stroke({
                                                                                  color: white,
                                                                                  width: width + 5,
                                                                                }),
                                                                               // zIndex: 4000,
                                                                              }),
                                                                              new Style({
                                                                                stroke: new Stroke({
                                                                                  color: blue,
                                                                                  width: width - 5,
                                                                                }),
                                                                               // zIndex: 4500,
                                                                              }),
                                                                            ];

                                                                            styles[GeometryType.MULTI_LINE_STRING] = styles[GeometryType.LINE_STRING];
                                                                           
                                                                            styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON].concat(
                                                                              styles[GeometryType.LINE_STRING]
                                                                            );
                                                                           
                                                                            styles[GeometryType.POINT] = [
                                                                              new Style({
                                                                                image: new Circle({
                                                                                  radius: width * 2,
                                                                                  fill: new Fill({
                                                                                    color: blue,
                                                                                  }),
                                                                                  stroke: new Stroke({
                                                                                    color: white,
                                                                                    width: width / 2,
                                                                                  }),
                                                                                }),
                                                                               // zIndex: 5000,
                                                                              }),
                                                                            ];

                                                                            styles[GeometryType.MULTI_POINT] = styles[GeometryType.POINT];
                                                                           
                                                                            styles[GeometryType.GEOMETRY_COLLECTION] = styles[
                                                                              GeometryType.POLYGON
                                                                            ].concat(styles[GeometryType.LINE_STRING], styles[GeometryType.POINT]);


                                                          var selected_style 
                                                    
                                                          // selected_style =   styles[GeometryType.MULTI_LINE_STRING]
                                                          // selected_style =   styles[GeometryType.POLYGON]
                                                          // selected_style =   styles[GeometryType.LINE_STRING]
                                                          selected_style  =   styles

                                                          console.log(" - - - selected - - - style - - - ", selected_style)

                                                   //  *** end *** *** selected style  *** *** ***    






                                                   var  _pbf_url = ___url_string + '/tile/{z}/{y}/{x}.pbf'



                                                    // default style
                                                    var vtLayer = new VectorTileLayer({

                                                                  // declutter: true,
                                                                    source: new VectorTileSource({
                                                                                                // maxZoom: 15,
                                                                                                declutter: true,
                                                                                                  format: new MVT({
                                                                                                  // idProperty: 'iso_a3',
                                                                                                  }),

                                                                                                  // ....pbf vector layer is un-styled, only the geometry line, can be used as highlighted vector layer on hover  sample:  https://openlayers.org/en/latest/examples/vector-tile-selection.html  
                                                                                                //  url: 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/tile/{z}/{y}/{x}.pbf'
                                                                                                //  url: 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/tile/{z}/{y}/{x}.pbf'
                                                                                                  url: _pbf_url
                                                                                                            
                                                                                                }),

                                                                    style: plain_style

                                                                  });


                                                
                                            
                                      


                                              // Selection
                                              var selectionLayer = new VectorTileLayer({

                                                                                // selection layer must get source orginal vector tile layer
                                                                                source: vtLayer.getSource(),
                                                                                
                                                                                style: function (feature) {

                                                                                              var ol_uid =  feature.ol_uid
                                                                                              var F_id_ = feature.getId()
                                                                                              var geometry_type_ = feature.type_

                                                                                              // only for testing, will slow down browser
                                                                                              //console.log(' ====  ---====  ---==== selection  ====---  ====---  ==== ',feature, F_id_,  ol_uid, geometry_type_,  selection )

                                                                                              /* not use,  because "id_" is always undefined
                                                                                              //if (feature.getId() in selection) {
                                                                                              // in use,  ol_uid  
                                                                                              */

                                                                                              // without "if ()" will highlight all feature, with 'if' only highlight selected feature. 
                                                                                              if (ol_uid in selection) {
                                                                                                      // only for testing, will slow down browser
                                                                                                      //console.log(' ====  ====  ==== highlight  ====  ====  ==== ', geometry_type_, F_id_,  ol_uid, selected_style[geometry_type_] )
                                                                                                      return selected_style[geometry_type_];
                                                                                             }

                                                                                    } // style

                                                                  });  // selection layer

                                                                  

                              //    *******   end   *******      *******    arcgis vector layer and style  *******      *******      *******      *******  





/**/




                       // How do I change the projection  https://openlayers.org/en/latest/doc/faq.html
                       const initLonLat = [_center_long, _center_lat];
                       const initLonLatWebMercator = fromLonLat(initLonLat);
                       

      
                       // openlayer toggle layers  
                       // https://medium.com/gis-tips/openlayers-3-adding-a-layer-switcher-9b63ae9e5253
                       //  https://github.com/walkermatt/ol-layerswitcher     






               







                var map = new Map({
                 
                                              target: 'map',

                                              // base map layer switcher  at :  https://github.com/walkermatt/ol-layerswitcher-examples/blob/master/parcel/main.js
                                              layers: [
                                                          new LayerGroup({
                                                                              'title': 'Base Maps',
                                                                              //  'title': '    ',  // title must have something, can not be empty
                                                                              layers: [





                                                                                // open street map 
                                                                                                      new LayerTile({
                                                                                                        title: 'Open Street Map',
                                                                                                        type: 'base',
                                                                                                        visible: false,
                                                                                                        source: new SourceOSM()
                                                                                                    }),




                                                                                //  BingMaps




                                                                                              //https://openlayers.org/en/latest/examples/bing-maps.html



                                                                                                  new TileLayer({
                                                                                                    title: 'BingMaps Aerial With Labels',
                                                                                                    type: 'base',
                                                                                                    visible: true,
                                                                                                    preload: Infinity,
                                                                                                    source: new BingMaps({
                                                                                                      key: bingMaps_key,
                                                                                                      imagerySet: 'AerialWithLabelsOnDemand',
                                                                                                      // use maxZoom 19 to see stretched tiles instead of the BingMaps
                                                                                                      // "no photos at this zoom level" tiles
                                                                                                      // maxZoom: 19
                                                                                                    })
                                                                                                  }),




                                                                                                  new TileLayer({
                                                                                                    title: 'BingMaps Arial',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new BingMaps({
                                                                                                      key: bingMaps_key,
                                                                                                      imagerySet: 'Aerial',
                                                                                                      // use maxZoom 19 to see stretched tiles instead of the BingMaps
                                                                                                      // "no photos at this zoom level" tiles
                                                                                                      // maxZoom: 19
                                                                                                    })
                                                                                                  }),





                                                                                
                                                                                                  new TileLayer({
                                                                                                    title: 'BingMaps Road',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new BingMaps({
                                                                                                      key: bingMaps_key,
                                                                                                      imagerySet: 'RoadOnDemand',
                                                                                                      // use maxZoom 19 to see stretched tiles instead of the BingMaps
                                                                                                      // "no photos at this zoom level" tiles
                                                                                                      // maxZoom: 19
                                                                                                    })
                                                                                                  }),



                                                                                                  new TileLayer({
                                                                                                    title: 'BingMaps Road dark',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new BingMaps({
                                                                                                      key: bingMaps_key,
                                                                                                      imagerySet: 'CanvasDark',
                                                                                                      // use maxZoom 19 to see stretched tiles instead of the BingMaps
                                                                                                      // "no photos at this zoom level" tiles
                                                                                                      // maxZoom: 19
                                                                                                    })
                                                                                                  }),

                                                                                                  


                                                                                                  

                                                                                      // here map
                                                                                                                  
                                                                                                                                                
                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Satellite',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'satellite.day',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),


                                                                                                  
                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Satellite Hybrid',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'hybrid.day',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),





                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Terrain',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'terrain.day',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),



                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Pedestrian',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'pedestrian.day',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),



                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Transit',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'normal.day.transit',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),



                                                                                                new TileLayer({
                                                                                                  title: 'HereMaps Normal',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    url: createUrl(urlTpl, {
                                                                                                                              base: 'aerial',
                                                                                                                              type: 'maptile',
                                                                                                                              scheme: 'normal.day',
                                                                                                                              api_key: here_apiKey,
                                                                                                                              app_id: appId,
                                                                                                                              app_code: appCode,
                                                                                                                            }),
                                                                                                    attributions:
                                                                                                      'Map Tiles &copy; ' +
                                                                                                      new Date().getFullYear() +
                                                                                                      ' ' +
                                                                                                      '<a href="http://developer.here.com">HERE</a>',
                                                                                                  })
                                                                                                }),











                                                                                // esri 


                                                                                                  new TileLayer({

                                                                                                    title: 'ESRI World Imagery (WGS84)',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new XYZ({
                                                                                                      attributions: 'Copyright:©  ESRI, DigitalGlobe, GeoEye',
                                                                                                      url:
                                                                                                        'https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery' +
                                                                                                        '/MapServer/tile/{z}/{y}/{x}',
                                                                                                      maxZoom: 21,
                                                                                                      projection: 'EPSG:4326',
                                                                                                      tileSize: 512, // the tile size supported by the ArcGIS tile service
                                                                                                      maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
                                                                                                      wrapX: true,
                                                                                                    })
                                                                                                  }), 




                                                                                                  new TileLayer({

                                                                                                    title: 'ESRI World Imagery 2D',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new XYZ({
                                                                                                      attributions: 'Copyright:©  ESRI, i-cubed, GeoEye',
                                                                                                      url:
                                                                                                        'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D' +
                                                                                                        '/MapServer/tile/{z}/{y}/{x}',
                                                                                                      maxZoom: 21,
                                                                                                      projection: 'EPSG:4326',
                                                                                                      tileSize: 512, // the tile size supported by the ArcGIS tile service
                                                                                                      maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
                                                                                                      wrapX: true,
                                                                                                    })
                                                                                                  }), 
                                                                                                



                                                                                                  new TileLayer({

                                                                                                    title: 'ESRI World Topo',
                                                                                                    type: 'base',
                                                                                                    visible: false,
                                                                                                    preload: Infinity,
                                                                                                    source: new XYZ({
                                                                                                      attributions: 'Copyright:©  ESRI, DigitalGlobe, GeoEye',
                                                                                                      url:
                                                                                                        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map' +
                                                                                                        '/MapServer/tile/{z}/{y}/{x}',
                                                                                                    
                                                                                                    })
                                                                                                  }), 




                                                                                                new TileLayer({

                                                                                                  title: 'ESRI World Imagery',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    attributions: '© ESRI, NOAA, USGS, Here, Garmin',
                                                                                                    url:
                                                                                                      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery' +
                                                                                                      '/MapServer/tile/{z}/{y}/{x}',
                                                                                                  
                                                                                                  })
                                                                                                }), 




                                                                                                new TileLayer({

                                                                                                  title: 'ESRI National Geographic Map',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    attributions: '© ESRI, NASA, NOAA, USGS',
                                                                                                    url:
                                                                                                      'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map' +
                                                                                                      '/MapServer/tile/{z}/{y}/{x}',
                                                                                                  
                                                                                                  })
                                                                                                }), 




                                                                                                new TileLayer({

                                                                                                  title: 'ESRI World Shaded Relief',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    attributions: '© ESRI, National Geographic Sociaty, i-cubed, DeLorme',
                                                                                                    url:
                                                                                                      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief' +
                                                                                                      '/MapServer/tile/{z}/{y}/{x}',
                                                                                                    
                                                                                                  })
                                                                                                }), 

                                                                                                new TileLayer({

                                                                                                  title: 'ESRI World Terrain',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    attributions: '© ESRI, USGS, NOAA, Garmin',
                                                                                                    url:
                                                                                                      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base' +
                                                                                                      '/MapServer/tile/{z}/{y}/{x}',
                                                                                                    
                                                                                                  })
                                                                                                }), 



                                                                                  

                                                                                                new TileLayer({

                                                                                                  title: 'ESRI World Hillshade',
                                                                                                  type: 'base',
                                                                                                  visible: false,
                                                                                                  preload: Infinity,
                                                                                                  source: new XYZ({
                                                                                                    attributions: 'Copyright:©  ESRI, DigitalGlobe, GeoEye',
                                                                                                    url:
                                                                                                      'https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade' +
                                                                                                      '/MapServer/tile/{z}/{y}/{x}',
                                                                                                  
                                                                                                  })
                                                                                                }), 

                                                                                    








                                                                                // stamen
                                                                                            new LayerGroup({
                                                                                                title: 'Stamen Map water color with labels',
                                                                                                type: 'base',
                                                                                                combine: true,
                                                                                                visible: false,
                                                                                                layers: [
                                                                                                    new LayerTile({
                                                                                                        source: new SourceStamen({
                                                                                                            layer: 'watercolor'
                                                                                                        })
                                                                                                    }),
                                                                                                    new LayerTile({
                                                                                                        source: new SourceStamen({
                                                                                                            layer: 'terrain-labels'
                                                                                                        })
                                                                                                    })
                                                                                                ]
                                                                                            }),

                                                                                            new LayerTile({
                                                                                                title: 'Stamen Map water color',
                                                                                                type: 'base',
                                                                                                visible: false,
                                                                                                source: new SourceStamen({
                                                                                                    layer: 'watercolor'
                                                                                                })
                                                                                            })











                                                                              ]       // layers
                                                                        }),

                                                          // add this layer after olms styled layer  https://medium.com/@ThomasG77/multiple-ways-to-add-layers-in-openlayers-2c9569beb948              
                                                          //  layers: [vtLayer]
                                                                  
                                                      ],  
                    
                                              view: new View({
                                                              //How do I change the projection  https://openlayers.org/en/latest/doc/faq.html
                                                              center: initLonLatWebMercator,
                                                              zoom: _center_zoom
                                                            }),

                                            
                                  });

                


                // ---- base map switcher ------
                   // https://github.com/walkermatt/ol-layerswitcher#options


                      var layerSwitcher = new LayerSwitcher({
                                                              activationMode:'click', //'mouseover',   // or click
                                                              startActive: false, //true,             // when create
                                                              // label: 'base',
                                                              // collapseLabel: '\u00BB',    // default
                                                              // tipLabel: 'Legend',
                                                              reverse: false,
                                                              groupSelectStyle:  'group',    //'children'
                                                            });
                      map.addControl(layerSwitcher);
                // ----  end   ----  base map switcher ------




                /*
                          =============  ============== add control   =============  ==============
                geolocation, zoom2you
                   
                https://stackoverflow.com/questions/65923306/openlayers-add-control-zoom-pan-to-current-location
                
                               */

                              import Geolocation from 'ol/Geolocation';
                              import ZoomToExtent from 'ol/control/ZoomToExtent';
                              import * as olExtent from 'ol/extent';
                              //import {createEmpty} from 'ol/extent';
                              //import {extend} from 'ol/extent';

                              var geolocation = new Geolocation({
                                projection: map.getView().getProjection(),
                                tracking: true
                              });
                             // geolocation.getPosition(); //this shows the coordinates (e.g.[591374.2306195896, 6746799.171545821])
                              var extent = olExtent.createEmpty();
                              geolocation.on('change:accuracyGeometry', function() {
                                    geolocation.getAccuracyGeometry().getExtent(extent);
                              });
                              var zoomToExtentControl = new ZoomToExtent({
                              //https://openlayers.org/en/latest/apidoc/module-ol_control_ZoomToExtent-ZoomToExtent.html
                                  extent: extent,
                                  className: 'zoom2you',
                                  // label: '🔍'
                                  label: 'zoom2you'
                                });
                              map.addControl(zoomToExtentControl);

                                        
                              var zoom2layer_now = function(e) {
                                // special for vector tile
                                pan_to_real_location()
                              };
                              var element2 = document.createElement('div');
                                element2.innerHTML = '<big>zoom2layer</big>';
                                element2.className = 'zoom2layer';
                                element2.addEventListener('click', zoom2layer_now, false);
                              var zoom2layerControl = new Control({
                                element: element2
                              });
                              map.addControl(zoom2layerControl);


                             
                              var element4 = document.createElement('div');
                                  element4.id = 'zoom_level_id';
                                  //element4.value = _center_zoom
                                  element4.innerHTML = '<big>' + _center_zoom +'</big>';
                                  element4.className = 'zoomLevel';
                               
                              var zoomlevelControl = new Control({
                                element: element4
                              }); 
                              map.addControl(zoomlevelControl);

                            /**/

                            /*  do not use opacity control, because it trigger popup window, also some basic without image overlay, do not need opacity. so keep opacity in setting area 
                            var opacity_now = function(e) {
                                //map.getView().setRotation(0);
                                alert('opacity')
                            };
                            var element3 = document.createElement('div');
                                element3.innerHTML = '<label> Opacity </label> <label id="overlay_opacity_label"></label><input type="range" id="overlay_opacity_range" name="overlay_opacity_range" min="0" max="10"/> ';
                                element3.className = 'opacityDIV';
                                //element3.addEventListener('click', opacity_now, false);
                            var opacityControl = new Control({
                                element: element3
                            }); 
                            map.addControl(opacityControl);
                            */


                            
                             /*
                                      =============   end  ============== add control   =============  ==============        
                              */










             //   ====================  add ol-mapbox-gl    ====================  

             var  _rootJson_url = ___url_string + '/resources/styles/root.json'
                  
         
                 console.log(' _rootJson_url ',  _rootJson_url )
                 console.log('___url_strin ',___url_string )
                  /*   
                                                olms( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"  );
                                                    Like olms, but returns an ol/Map instance instead of a Promise
                                                    map = apply( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"  );
                                        
                                               

                                                works, because "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer" will return json 
                                                apply( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"  );

                                                  not works, because "https://gis.la-quinta.org/arcgis/rest/services/Hosted/ParcelZoning/VectorTileServer" will return HTML, not json. 
                                                apply( map,    "https://gis.la-quinta.org/arcgis/rest/services/Hosted/ParcelZoning/VectorTileServer/resources/styles/root.json"  );

                                                In order to work, must add '?f=json' at the end of URL  
                                                like this: https://gis.la-quinta.org/arcgis/rest/services/Hosted/ParcelZoning/VectorTileServer?f=pjson

                                                style root.json url have no change. 

                                       for v6.9.0    v7.1.1   , without "transformRequest"  
                                       apply( map,     _rootJson_url   );

                                        working only for v8.x.x ,  must add 'transformRequest' to manually append '?f=json' to the end of URL
                  */
                 

                                 
                                        
                                        /**/


                                        
                                     /*  highlight version must use promise,  highlight feature when user hover,       */

                                              const promise =   apply(
                                                map, 
                                                _rootJson_url, 

                                                {
                                                  transformRequest(url) {

                                                        var modifiedUrl_obj;
                                                        var tilepathfixed_urlstring;
                                                        /*
                                                              .../vectorTileServer?f=json  tile path error,   

                                                              https://github.com/openlayers/ol-mapbox-style/issues/531
                                                                this worked by chance, because of a bug in ol-mapbox-style. The problem is that the TileJSON document (https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/) contains an incorrect tiles entry:
                                                                    "tiles": [
                                                                        "/tile/{z}/{y}/{x}.pbf"
                                                                    ]
                                                                The url in there resolves to https://tiles.arcgis.com/tile/{z}/{y}/{x}.pbf, because it starts with a /, which means it is a complete path, not a relative url. If the tiles entry was
                                                                    "tiles": [
                                                                        "./tile/{z}/{y}/{x}.pbf"
                                                                    ]
                                                                it would work correctly. But the way things are, you'll need transformRequest again to fix the path.
                                                        */                                              
                                                        if (url.includes('.pbf') && url.includes('/tile/')) {
                                                                    /*
                                                                        wrong url, missing part,       :  https://tiles.arcgis.com/tile/4/7/5.pbf
                                                                        should correct to : https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/tile/4/7/5.pbf
                                                                    */
                                                                    var index_of_tile = url.indexOf('/tile/');
                                                                    tilepathfixed_urlstring = ___url_string + url.substring(index_of_tile)
                                                                    //console.log(' pbf --> ', tilepathfixed_urlstring)
                                                                    modifiedUrl_obj = new URL(tilepathfixed_urlstring)
                                                        } else {
                                                                    modifiedUrl_obj = new URL(url);
                                                                    /* 
                                                                        default, is html for this link, https://gis.la-quinta.org/arcgis/rest/services/Hosted/ParcelZoning/VectorTileServer
                                                                        we need add 'f=json' at URL end, enforce arcgis server output json instead of html      https://github.com/openlayers/ol-mapbox-style/issues/529
                                                                    */
                                                                    modifiedUrl_obj.searchParams.append('f', 'json');
                                                        }    

                                                        return new Request(modifiedUrl_obj);
                                                  }
                                                }
                                              )
                                    
                                              /*  ---------  for highlight feature polygon only  ---------  */

                                                    const promise2 = promise.then(successCallback, failureCallback);
                                              
                                                    function successCallback(){

                                                          console.log(' olms completed')

                                                          //Multiple ways to add layers in OpenLayers  https://medium.com/@ThomasG77/multiple-ways-to-add-layers-in-openlayers-2c9569beb948
                                                          map.addLayer(vtLayer);
                                                          map.addLayer(selectionLayer);
                                                          
                                                        
                                                        //keep here must wait until all map vector tile loaded completed. 
                                                        set_opacity(vectorTile_opacity)

                                                    }

                                                    function failureCallback(){
                                                      console.log(' olms failed')
                                                    }

                                             /*   --------- end  ---------   for highlight feature polygon only  ---------  */

                /**/                             

              //     ====================  end  ====================  add ol-mapbox-gl    ====================  



/**/


                // map idle event     
                map.on('moveend', onMoveEnd);

                // user click map event
                map.on(['click', 'pointermove'], showInfo);
               // map.on(['click'], showInfo);  // click only, for testing

               // var info = document.getElementById('info');
                









               function wrapLon(value) {
                var worlds = Math.floor((value + 180) / 360);
                return value - worlds * 360;
              }




                var centerlong
                var centerlat
                var centerzoom
               function onMoveEnd(evt) {


                //https://openlayers.org/en/latest/examples/moveend.html


                var map = evt.map;
                var extent = map.getView().calculateExtent(map.getSize());
                var bottomLeft = toLonLat(getBottomLeft(extent));
                var topRight = toLonLat(getTopRight(extent));

                    
                    // display('left', wrapLon(bottomLeft[0]));
                    // display('bottom', bottomLeft[1]);
                    // display('right', wrapLon(topRight[0]));
                    // display('top', topRight[1]);

                centerlong =  ( wrapLon(bottomLeft[0]) +  wrapLon(topRight[0]) ) / 2
                centerlat =  ( bottomLeft[1] +  topRight[1] ) / 2
                centerzoom = map.getView().getZoom();
                centerzoom = Number(centerzoom).toFixed(2);

                update_url_parameter('center_long', centerlong);
                update_url_parameter('center_lat', centerlat);
                update_url_parameter('center_zoom', centerzoom);

                $('#zoom_level_id').html('<big>' + centerzoom +'</big>');
                
              }











               function showInfo(event) {

                if (operation_mode == 'hover') {

                /*
                      Vector Layer Hit Detection example: 
                                   https://openlayers.org/en/latest/examples/hitdetect-vector.html
                      https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#getFeaturesAtPixel
                      https://openlayers.org/en/latest/examples/vector-tile-selection.html

                    //Do not use,  correctly highlight line, but failed to get properties. 
                    vtLayer.getFeatures(event.pixel).then(function (features) { 


                     // getFeaturesAtPixel, options
                        1) layerFilter
                        2) hitTolerance	number (defaults to 0)	
                                            Hit-detection tolerance in css pixels. Pixels inside the radius around the given position will be checked for features.
                        
                    */
              
                      var _options_for_getFeaturesAtPixel = {
                                                                //layerFilter: function(){ return true},

                                                                    hitTolerance : 0 // default 0
                                                                  }
                     var features = map.getFeaturesAtPixel(event.pixel, _options_for_getFeaturesAtPixel );
                     //var features = map.getFeaturesAtPixel(event.pixel);
                    
                     

                 // vtLayer.getFeatures(event.pixel).then(function (features) { 


                     // console.log('all features at pixel  ', features)
                          
                      if (features) {
                        // null.length is error  
                        if (features.length > 0) { 

                                    /* for highlight selected feature only */ 
                                     

                                    selection = {};

                                    /* not work, no highlight at all, loop through all element in feature array.
                                    var selected_feature
                                    for (var j = 0; j < features.length; j++) { 
                                      var properties = features[j].getProperties();
                                      if (properties['mapbox-layer']) {
                                          selected_feature = features[j]
                                          var fid = selected_feature.ol_uid;
                                          console.log('selected_feature fid', fid, selected_feature)
                                          // add selected feature to lookup
                                          selection[fid] = selected_feature;
                                      }
                                    } // for
                                    */


                                    // not work, if "line", only "polygon" works
                                    var selected_feature = features[0]
                                   

                                       if (selected_feature){                                                                       
                                              // not use,  id_ always undefined
                                              //var fid = selected_feature.getId();   
                                              // in use,  ol_uid
                                              var fid = selected_feature.ol_uid;
                                              console.log('selected_feature fid', fid, selected_feature)
                                              // add selected feature to lookup
                                              selection[fid] = selected_feature;
                                              

                                              selectionLayer.changed();
                                       }


                                    /*   -- end -- for highlight selected feature only */ 




                                          /*


                                                  https://github.com/openlayers/openlayers/issues/6752

                                                  this is a feature object in mapbox (vector tile)

                                                                            layer: {id: "County:1/45 - 53 years of age", type: "fill", source: "esri", source-layer: "County:1", minzoom: 3.96, …}
                                                                            properties: {_symbol: 5}
                                                                            source: "esri"
                                                                            sourceLayer: "County:1"
                                                                            state: {}
                                                                            type: "Feature"
                                                                            _vectorTileFeature: Co {properties: {…}, extent: 4096, type: 3, _pbf: Js, _geometry: 7785, …}  



                                                  This is openlayes,  feature object (vector tile) 
                                                                                  
                                                                              0: RenderFeature
                                                                                  properties_:
                                                                                          layer: "County:2"
                                                                                          mapbox-layer: {id: "County:2/36 - 45 years of age", type: "fill", source: "esri", source-layer: "County:2", filter: Array(3), …}
                                                                                          _symbol: 4
                                                                                          type_: "Polygon"



                                          */

                                         // does not working          
                                         // var more_properties= selected_feature["properties_"]["mapbox-layer"];

                                         var more_properties = {value:'No data'};
                                         var layerId= 'No data';

                                         // ......... 1st layer,  root.json style  , 2nd layer, open street map ............
                                               // loop through all features, find the first one have ['mapbox-layer'].id

                                               // because no selected feature, I have to manually loop through all element in feature array.
                                               for (var j = 0; j < features.length; j++) { 

                                                       var properties = features[j].getProperties();

                                                       if (properties['mapbox-layer']) {

                                                         // console.log('properties feature[0] ',  properties)
                                                           layerId = properties['mapbox-layer'].id;
                                                           more_properties = properties;
                                                           break; // for loop
                                                       }
                                   
                                               } // for


                                          console.log('click or hover event -->  ', event.type)

                                          console.log(' mouse move --> get info --> ', more_properties)

                                                          if (event.type == 'pointermove'){
                                                                
                                                                show_info_outline_Tab(more_properties)

                                                          } else if (event.type == 'click') {

                                                                // more properties
                                                                //show_listTab(more_properties)
                                                                show_info_outline_Tab(more_properties)
                                                          }




                        } else {
                                      /* for highlight selected feature only */ 
                                          selection = {};
                                          selectionLayer.changed();
                                      /*  -- end -- for highlight selected feature only */ 

                                    //  console.log('close info window ---> features -->  ', features )
                                      

                                      if (event.type == 'pointermove'){                                      
                                                empty_info_outline_Tab()
                                      } else if (event.type == 'click') {
                                               // empty_list_Tab()
                                      }
                        } // if        

                      } // if

       
                //  }); // vtLayer.getFeatures(event.pixel).then(function (features) { 

                } // if hover
              } // function showInfo




          


     //  });  // dom ready 










                    
            





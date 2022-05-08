
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


 // use fetch, must include 'regenerator-runtime/runtime', without this  "parcel" (package bundler) will 'regeneratorRuntime is not defined' error
// avoid error,  regeneratorRuntime is not defined` error
// https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import 'regenerator-runtime/runtime'





import 'ol/ol.css';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';




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




import '@mdi/font/css/materialdesignicons.min.css'




// helper.js 
              import {


                                // variable


/**/
                                  
                                        vectorTile_opacity_readonly,
                                    
                                        // init_global_var
                                        _layer, current_url, current_pathname, current_pathArray, urlParams, _cross, ___url_string, ___url, _center_lat, _center_long, _center_zoom, center, open_tab, base_url, ___protocol, ___hostname, ___pathname, ___urlParams, ___pathArray, ___service,
                              
                                        
                                        // materialize_init_tab
                                        init_tabs ,instance_tabs,



                                        // init_json_viewer
                                        container_info_outline, container_list, editor_info_outline, editor_list, 



                                        //  vector tile 
                                        root_json,_sprite,_glyphs,_tile_pbf,original_rootJson,

                                      


                              // function

                                            init_global_var,

                                            update_url_parameter,
                                            init_json_viewer,

                                           
                                           
                                            empty_list_Tab,
                                            empty_info_outline_Tab,
                                            show_listTab,
                                            show_info_outline_Tab,
                                            

                                            //legend
                                            get_vectorTileStyle,
                                            vectorStyle_toLegent,
                                            getUniqueLayers,

                                            // vector tile
                                            build_root_json,

                                           

                
              } from './helper.js'






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

                $('#zoom2layer_button').on('click', function(event) {
                      //  pan_to_real_location(); 
                });


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


                                      if ( vectorTile_opacity_readonly) {
                                        // readonly import from helper.js from url param overlayOpacity=4 
                                        vectorTile_opacity =  vectorTile_opacity_readonly
                                       }


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







             
console.log(' ---  ---  ---  =====  document ready  --- ----- ')
                    

               

                  init_global_var();
                  init_settingTab()

                  init_json_viewer();
                  init_user_interface_event();
                  change_operation_mode('hover')
                 

                  // must use await to wait until ajax get root.json back
                  build_root_json(___url_string);

                  // legend -------- get   -------   root.json (style)    -------   
                  get_vectorTileStyle(___url_string)

console.log(' ------ end  ------   document ready ----- ')




                          
                       


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
                                                                                                        visible: true,
                                                                                                        source: new SourceOSM()
                                                                                                    }),




                                                                                //  BingMaps
                                                                                              //https://openlayers.org/en/latest/examples/bing-maps.html

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
                                                                                                    title: 'BingMaps Aerial With Labels',
                                                                                                    type: 'base',
                                                                                                    visible: false,
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
                                                              startActive: true,             // when create
                                                              // label: 'base',
                                                              // collapseLabel: '\u00BB',    // default
                                                              // tipLabel: 'Legend',
                                                              reverse: false,
                                                              groupSelectStyle:  'group',    //'children'
                                                            });
                      map.addControl(layerSwitcher);
                // ----  end   ----  base map switcher ------




          /**/




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

                var centerlong =  ( wrapLon(bottomLeft[0]) +  wrapLon(topRight[0]) ) / 2
                var centerlat =  ( bottomLeft[1] +  topRight[1] ) / 2
                var centerzoom = map.getView().getZoom();

                update_url_parameter('center_long', centerlong);
                update_url_parameter('center_lat', centerlat);
                update_url_parameter('center_zoom', centerzoom);
                
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


                      console.log('all features at pixel  ', features)
                          
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

                                      console.log('close info window ---> features -->  ', features )
                                      

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













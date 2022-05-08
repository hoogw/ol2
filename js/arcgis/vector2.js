
// xxxx2 is for highlight selection feature




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



import 'ol/ol.css';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';

// open street map 
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

import {fromLonLat} from 'ol/proj';


import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import View from 'ol/View';
import {Circle, Fill, Stroke, Style} from 'ol/style';



          // *****    ol-mapbox-style  v8.0.3 *****   

          import apply from 'ol-mapbox-style';
          import {applyStyle} from 'ol-mapbox-style';

// *****   end  *****    ol-mapbox-style   *****  
                                        
/**/


//Know which layer a feature belongs to  https://github.com/openlayers/ol-mapbox-style/pull/312
//import { recordStyleLayer } from 'ol-mapbox-style/dist/stylefunction';
//recordStyleLayer(true);








                        /*  not use, 6.3.0, only for ol-mapbox-gl 6.2.1,   

                              // ---------------------  async fetch  ------------------------

                                    // use fetch, must include 'regenerator-runtime/runtime', without this  "parcel" (package bundler) will 'regeneratorRuntime is not defined' error
                                    import 'regenerator-runtime/runtime';

                                    var rootJson;
                                    var layers;

                                    async function asyncFetch(){
                                            var response = await fetch("https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json")
                                            rootJson = await response.json();
                                            console.log(' root json --> ', rootJson)
                                          
                                    }

                                    asyncFetch()

                                  
                              // ---------------------   end   ---------------------  async fetch  ------------------------

                        */



                        // lookup for selection objects
                        var selection = {};


                        var _stroke = new Stroke({
                                                  color: 'rgba(255,255,255,0)', // white , transparent
                                                  width: 5,
                                                });


                        var _fill = new Fill({
                                              color: 'rgba(255,255,255,0)', // white , transparent
                                            });


                        var _circle =   new Circle({
                                                      fill: _fill,
                                                      stroke: _stroke,
                                                      radius: 1
                                               });        
                                               
                                               
                        var _stroke_selected = new Stroke({
                                                      color: 'rgba(0,0,0,0.8)',
                                                      width: 2,
                                                    });


                        var _fill_selected = new Fill({
                                                        color: 'rgba(255,255,0,0.8)',
                                                      });


                        var _circle_selected =   new Circle({
                                                      fill: _fill_selected,
                                                      stroke: _stroke_selected,
                                                      radius: 8
                                              });          








                        var plain_style = new Style({
                                                          stroke: _stroke,
                                                          fill: _fill,
                                                          image: _circle
                                                    });








                       var selected_style = new Style({
                                                            stroke: _stroke_selected,
                                                            fill: _fill_selected,
                                                            image: _circle_selected
                                                    });





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
                                                                    url: 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/tile/{z}/{y}/{x}.pbf'

                                                                              
                                                                  }),

                                      style: plain_style

                                    });


                   
              
         


                // Selection
                var selectionLayer = new VectorTileLayer({

                                                         
                                                    
                                                   source: vtLayer.getSource(),
                                                        
                                                      


                                                      style: function (feature) {

                                                                var ol_uid =  feature.ol_uid

                                                                // not use,  id_ always undefined
                                                                //if (feature.getId() in selection) {
                                                                // in use,  ol_uid  
                                                                if (ol_uid in selection) {
                                                                        return selected_style;
                                                                }

                                                      } // style

                                    });  // selection layer









                       // How do I change the projection  https://openlayers.org/en/latest/doc/faq.html
                       const initLonLat = [-118, 34];
                       const initLonLatWebMercator = fromLonLat(initLonLat);
                       


                var map = new Map({

                  
                              // open streets map as base
                              layers: [
                                new TileLayer({
                                  source: new OSM(),
                                }) ],
                   



                                target: 'map',

                                view: new View({
                                                //How do I change the projection  https://openlayers.org/en/latest/doc/faq.html
                                                center: initLonLatWebMercator,
                                                zoom: 3
                                              }),

                              // add this layer after olms styled layer  https://medium.com/@ThomasG77/multiple-ways-to-add-layers-in-openlayers-2c9569beb948              
                              //  layers: [vtLayer]

                           /*  
                              layers: [
                                new VectorTileLayer({
                                  declutter: true,
                                  source: new VectorTileSource({
                                    
                                    format: new MVT(),
                                    url:'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/tile/{z}/{y}/{x}.pbf'
                                      
                                  })
                                  
                                }) ]
                      
                            */



                });

                

               




              //   ====================  add ol-mapbox-gl    ====================  
  
                  /*
                      
                            createMap(
                                "map",
                                "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"
                                //"https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/styles/root.json"

                              );
                              
                     */ 


                      
                        //  ol-mapbox-gl vector tile layer create a separated already styled vector layer.  https://github.com/openlayers/ol-mapbox-style#stylefunction
                        //  olms return a promise
                        //const promise = olms(map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json");
                       const promise = apply( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/styles/root.json");







                        // olms( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"  );


                        // Like olms, but returns an ol/Map instance instead of a Promise
                        // map = apply( map,    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"  );
            
                
                       const promise2 = promise.then(successCallback, failureCallback);
                  
                        
                        function successCallback(){

                              console.log(' olms completed')

                              //Multiple ways to add layers in OpenLayers  https://medium.com/@ThomasG77/multiple-ways-to-add-layers-in-openlayers-2c9569beb948
                             map.addLayer(vtLayer);
                             map.addLayer(selectionLayer);


                        }

                        function failureCallback(){
                          console.log(' olms failed')
                        }



              //     ====================  end  ====================  add ol-mapbox-gl    ====================  









                map.on(['click', 'pointermove'], showInfo);

                var info = document.getElementById('info');
                


                function showInfo(event) {

                  
                            var features = map.getFeaturesAtPixel(event.pixel);


                           console.log('all features at pixel  ', features)
                                                                


                            if (!(features)) {
                                    //if (!features.length) {  // not works, error null.length 


                                    selection = {};
                                    selectionLayer.changed();

                                                info.innerText = '';
                                                info.style.opacity = 0;
                                                return;
                            } // if



                          var selected_feature = features[0]


                          if (!selected_feature) {
                            return;
                          }

                          if (selected_feature){

                                                                                            
                                       // not use,  id_ always undefined
                                       // var fid = selected_feature.getId();   
                                       // in use,  ol_uid
                                       var fid = selected_feature.ol_uid;

                                       console.log('selected_feature fid', fid, selected_feature)
                                          
                                              selection = {};
                                            
                                            // add selected feature to lookup
                                            selection[fid] = selected_feature;

                                            selectionLayer.changed();





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



                                                                var layerId= 'No data';

                                                               


                                                                // ......... 1st layer, plain_style,  2nd layer,  selected_style,  3rd layer,  root.json style  ............
                                                                      // loop through all features, find the first one have ['mapbox-layer'].id

                                                                      
                                                                      for (var j = 0; j < features.length; j++) { 

                                                                        var properties = features[j].getProperties();

                                                                        if (properties['mapbox-layer']) {

                                                                          // console.log('properties feature[0] ',  properties)
                                                                            layerId = properties['mapbox-layer'].id;

                                                                            break; // for loop
                                                                        }
                                                          
                                                                      } // for


                                                                
                                                                 





                                                                  /*
                                                                      "layers": [
                                                                                    {
                                                                                        "id": "Block Group/0 - 28 years of age",
                                                                                        "type": "fill",
                                                                                        "source": "esri",
                                                                                        "source-layer": "Block Group",
                                                                                        "filter": [
                                                                                            "==",
                                                                                            "_symbol",
                                                                                            2
                                                                                        ],
                                                                                        "minzoom": 11.85,
                                                                                        "layout": {},
                                                                                        "paint": {
                                                                                            "fill-color": "#00729A",
                                                                                            "fill-outline-color": "#D6D6D6"
                                                                                        }
                                                                                    },
                                                                  */




                                                                  /*       ---------  not use, with 6.3.0, only for ol-mapbox-gl 6.2.1,          ---------  

                                                                  

                                                                     //   ******   temp work around is get id by loop through root.json based on _symbol value    ******  


                                                                            layers = rootJson.layers;
                                                                          
                                                                            // var featureId = features[0].getId();   //  feature ID is always undefined  
                                                                            var sourceLayer = features[0].get('layer')
                                                                            
                                                                         
                                                                          
                                                                                  for (var l = 0; l < layers.length; l++) { 

                                                                                      var currentLayer = layers[l]

                                                                                      if (
                                                                                              (currentLayer["source-layer"]) && 
                                                                                              (currentLayer["source-layer"] ==  sourceLayer) && 

                                                                                              (currentLayer["filter"]) && 
                                                                                              (currentLayer["filter"][2] ==  properties["_symbol"])
                                                                                          
                                                                                          ) {

                                                                                            layerId = currentLayer["id"]

                                                                                            break;  // for loop

                                                                                      }// if

                                                                                  
                                                                                  }// for


                                                                            //   ******   end     ******   temp work around is get id by loop through root.json based on _symbol value    ******  
                                     

                                                                  */









                                                      //info.innerText = JSON.stringify(properties, null, 2);
                                                      info.innerText = layerId

                                                      info.style.opacity = 1;



                                                     

                         }// if features[0]

                } // function showInfo






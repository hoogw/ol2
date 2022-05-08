




           




/**/






// .............. setting panel  ..............  
 
var setting_panel_status = false;  // default street view is off
 
// .............. end   ..............  setting panel  .............. 
 

 







/**/


// ++++++++++   geocode    ++++++++++

var _address_content="";
var _long_content="";
var _lat_content="";
var _url2_content="";
var _url1_content="";

var candidateLocationResult

var _candidate_location_geojson_layer;

var _singleLineAddressField
var _addressFields




var _zoom2layer_lat
var _zoom2layer_lng


// ++++++++++   end   ++++++++++   geocode    ++++++++++














/**/







                // =============================================== helper   =============================================== 



                                        /**/





// jsoneditor
import 'jsoneditor/dist/jsoneditor.css';   // do not forget CSS !
import JSONEditor from "jsoneditor";

/**/






                                        function show_info_outline_Tab(_properties_json){

                                          $('#info_outline').show();
                                          $('#jsoneditor_info_outline').show();                                        
                                          editor_info_outline.set(_properties_json);
                                          editor_info_outline.expandAll();
                                          editor_info_outline.setName(_layer)

                                        }



                                        function show_listTab(_properties_json){
                                              $('#list').show();
                                              $('#jsoneditor_list').show();
                                              editor_list.set(_properties_json);
                                              editor_list.expandAll();
                                              editor_list.setName(_layer)
                                        }


                                        function empty_info_outline_Tab(){
                                          $('#info_outline').hide();
                                          $('#jsoneditor_info_outline').hide();
                                          editor_info_outline.set({});
                                        }


                                        function empty_list_Tab(){
                                          $('#list').hide();
                                          $('#jsoneditor_list').hide();
                                          editor_list.set({});
                                        }












                                        
                                       
                                      









                                                
                                        // init_json_viewer
                                        var container_info_outline, container_list, editor_info_outline, editor_list, options;    
                                        function init_json_viewer(){

                                                              
                                                  container_info_outline = document.getElementById("jsoneditor_info_outline");
                                                  container_list = document.getElementById("jsoneditor_list");
                                                  // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
                                                  
                                                 // console.log('container_info_outline', container_info_outline)

                                                  // options = {sortObjectKeys:true};   // alphabetically sort object key, default is false
                                                  options = {        
                                                              modes:['view','tree','preview'],
                                                              mainMenuBar  : false,    // remove main menu bar
                                                              navigationBar : false,   // remove navigation bar
                                                              "search": false,          // remove search box , default is true
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





                                  // .............. setting panel  .............. 





                                  function turn_on_setting_panel() {

                                    $('#setting_panel').show();
                                    
                                    setting_panel_status = true;

                                  }



                                  function turn_off_setting_panel(){

                                            
                                          $('#setting_panel').hide();
                                            
                                          setting_panel_status = false;

                                  }



                          // .............. end   ..............  setting panel  .............. 




/**/



                     




                // init_global_var
                var  vectorTile_opacity_readonly;
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
                                                  vectorTile_opacity_readonly = parseInt(param_overlayOpacity) / 10 ;
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



              

           




             
  
  







          
              export {

                  // variable

                        /**/
                       
                        vectorTile_opacity_readonly, 

                        
                          //init_global_var
                           _layer, current_url, current_pathname, current_pathArray, urlParams, _cross, ___url_string, ___url, _center_lat, _center_long, _center_zoom, center, open_tab, base_url, ___protocol, ___hostname, ___pathname, ___urlParams, ___pathArray, ___service,
                 
                           


                          // init_json_viewer
                          container_info_outline, container_list, editor_info_outline, editor_list, 



                       



                 // function

                            init_global_var,
                           

                            update_url_parameter,
                            init_json_viewer,

                           
                            
                           
                            
                           
                            
                            
                            empty_list_Tab,
                            empty_info_outline_Tab,
                            show_listTab,
                            show_info_outline_Tab,
                           


                          

                         


              };



        
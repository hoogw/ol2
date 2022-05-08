




           




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



                     




              

           




             
  
  







          
              export {

                  // variable

                        /**/
                       
                        

                        
                         
                           


                          // init_json_viewer
                          container_info_outline, container_list, editor_info_outline, editor_list, 



                       



                 // function

                           
                           

                            update_url_parameter,
                            init_json_viewer,

                           
                            
                           
                            
                           
                            
                            
                            empty_list_Tab,
                            empty_info_outline_Tab,
                            show_listTab,
                            show_info_outline_Tab,
                           


                          

                         


              };



        
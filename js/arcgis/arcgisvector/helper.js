




           


/**/

                                                              // --------- add proxy  --------- 
                                                              var ____current_window_protocol = window.location.protocol

                                                              // default http
                                                              var proxyurl = "http://transparentgov.net:7000/";  

                                                              console.log('____current_window_protocol', ____current_window_protocol)

                                                              if (____current_window_protocol == 'https:') {
                                                              
                                                                proxyurl = "https://transparentgov.net:7200/";
                                                                
                                                              }
                                                  // --------- end  ---------  add proxy  --------- 




/**/





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
                                         // editor_info_outline.setName(_layer)

                                        }



                                        function show_listTab(_properties_json){
                                              $('#list').show();
                                              $('#jsoneditor_list').show();
                                              editor_list.set(_properties_json);
                                              editor_list.expandAll();
                                           //   editor_list.setName(_layer)
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



                     




                                                    

                                      async function asyncFetch(_url___){
                                        var response = await fetch(_url___)
                                        var responseJson = await response.json();
                                        //console.log(' root json --> ', responseJson)
                                        return responseJson
                                      }





                                      async function asyncAjax(_url___){

                                        var responseJson

                                        try {
                                              // test only
                                              // throw ' ++++++++ test only ++++++++ jsonp failed';


                                              // jsonp 

                                          var response_string =  await $.ajax({

                                              // large data take long long time , so should not time out, let it run until get it
                                              //timeout: _timeout,

                                                type: 'GET',
                                                dataType: 'jsonp',
                                                data: {},
                                                url: _url___,
                                                error: function (jqXHR, textStatus, errorThrown) {
                                                  
                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                                        console.log('ajax error  + ', _error_status);
                                                                      


                                                },
                                                success: function (data) {

                                                  console.log('async--ajax --> jsonp --> success  --> ');
                                                    
                                                
                                                }
                                              });  // await



                                                                          
                                          } catch(jsonp_failed) {
                                                  
                                                  
                                                                                console.log('async--ajax,  --> jsonp failed !!!!!!', jsonp_failed);
                                                  
                                                                              try {
                                                  
                                                                                            
                                                  
                                                  
                                                  
                                                                                              // test only
                                                                                              // throw ' ++++++++ test only ++++++++ cors failed'; 
                                                                              
                                                                                              // cors
                                                                                              var response_string =  await $.ajax({
                                                  
                                                                                                                                    // large data take long long time , so should not time out, let it run until get it
                                                                                                                                  // timeout: _timeout,
                                                  
                                                  
                                                                                                                                      type: 'GET',
                                                                                                                                      
                                                                                                                                      url: _url___,
                                                                                                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                                                                                                        
                                                                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                                              console.log('ajax error  + ', _error_status);
                                                                                                                                                          
                                                                                                              
                                                                                                              
                                                                                                                                      },
                                                                                                                                      success: function (data) {
                                                  
                                                                                                                                        console.log('async--ajax --> cors --> success  --> ');
                                                                                      
                                                                                                                                      }
                                                                                                                                    });  // await
                                                  
                                                  
                                                  
                                                  
                                                                                              
                                                                                
                                                                                } catch(cors_failed) {
                                                  
                                                                                              console.log('async--ajax,  --> cors failed !!!!!!', cors_failed);
                                                  
                                                                                              try {
                                                  
                                                                                                        
                                                  
                                                                                                        // proxy
                                                                                                        // --------- add proxy  ---------
                                                                                                        var _url___proxy = proxyurl +  _url___
                                                  
                                                                                                        var response_string =  await $.ajax({
                                                  
                                                                                                                                                  // large data take long long time , so should not time out, let it run until get it
                                                                                                                                                  // timeout: _timeout,
                                                  
                                                  
                                                                                                                                                  type: 'GET',
                                                                                                                                                  
                                                                                                                                                  url: _url___proxy,
                                                                                                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                                                                                                    
                                                                                                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                                                          console.log('ajax error  + ', _error_status);
                                                                                                                                                                      
                                                                                                                          
                                                                                                                          
                                                                                                                                                  },
                                                                                                                                                  success: function (data) {
                                                                                                                                                    console.log('async--ajax --> proxy --> success  --> ');
                                                                                      
                                                                                                                                                  }
                                                                                                        });  // await
                                                  
                                                  
                                                  
                                                  
                                                                                                      
                                                  
                                                  
                                                  
                                                                                              } catch(proxy_failed) {
                                                  
                                                  
                                                                                                console.log('original_rootJson,  --> proxy failed !!!!!!', proxy_failed);
                                                  
                                                  
                                                  
                                                                                              } // catch proxy
                                                                                        
                                                  
                                                                                } // catch cors
                                                  
                                                  
                                          } // catch jsonp

                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                          if (typeof response_string === 'object') {
                                              // is object
                                              responseJson = response_string
                                          } else {
                                              // is string
                                              responseJson = JSON.parse(response_string)
                                          }
                                              
                                          console.log(' >>>>>>>>  responseJson >>>>>>  ', responseJson);

                                          return responseJson


                                      }

                                                




                                                  
                                        
  







          
              export {

                  // variable

                        /**/
                       
                        

                        
                         
                           


                          // init_json_viewer
                          container_info_outline, container_list, editor_info_outline, editor_list, 



                       



                 // function

                           
                           

                            update_url_parameter,
                            init_json_viewer,

                           
                            asyncFetch,
                            asyncAjax,
                            
                            empty_list_Tab,
                            empty_info_outline_Tab,
                            show_listTab,
                            show_info_outline_Tab,
                           


                          

                         


              };



        
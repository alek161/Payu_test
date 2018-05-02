/**
 * Created by USER
 */


(function(){

    var myApp =  angular.module("GeekStore", []);

    //controllers

    myApp.controller("ProductsController" , ProductsController);

    ProductsController.$inject = ['$scope' , '$http'];
    function ProductsController($scope, $http) {
        $scope.products = [];
        var URL = "/api/matrix";
        $scope.product = "";
        $scope.quantity = 0;
        $scope.value = 0;
        
        var productosTienda = 
        	 [
        	 {"id": 1, "name": "Maestro Yoda", "price": 75000, "moneda": "COP$"},
        	 {"id": 2, "name": "Sable laser de plastico", "price": 35 , "moneda": "USD$"},
        	 {"id": 3, "name": "Nave espacial Halcon Milenario", "price": 125000, "moneda": "COP$"},
        	 {"id": 4, "name": "Estrella de la muerte", "price": 200 , "moneda": "USD$"},
        	 {"id": 5, "name": "R2D2 en fichas de Lego", "price": 450, "moneda": "MXN$"},
        	 {"id": 6, "name": "Jar Jar Binks Gobernador", "price": 800, "moneda": "MXN$"},
        	 ];
        /**
         * Funcion que busca el precio de un producto
         */
        $scope.foundPrice = function(idproduct){
        	var price = 0;
            for(var i = 0 ;  i < productosTienda.length; i++){
                if(  productosTienda[i].id == idproduct){
                    price = productosTienda[i].price;
                }
            }
            return price;
        };    
        /**
         * Funcion que busca el nombre de un producto
         */
        $scope.foundName = function(idproduct){
        	var name = "";
            for(var i = 0 ;  i < productosTienda.length; i++){
                if(  productosTienda[i].id == idproduct){
                    name = productosTienda[i].name;
                }
            }
            return name;
        };         

        $scope.foundMoneda = function(idproduct){
        	var name = "";
            for(var i = 0 ;  i < productosTienda.length; i++){
                if(  productosTienda[i].id == idproduct){
                    name = productosTienda[i].moneda;
                }
            }
            return name;
        };        
        /**
         * Calculo de precio a moneda colombiana
         */
        $scope.foundPriceCol = function(idproduct){
        	var finalPrice = 0;
            for(var i = 0 ;  i < productosTienda.length; i++){
                if(  productosTienda[i].id == idproduct){
                    //usd
                	if(productosTienda[i].moneda == 'USD$'){
                		finalPrice = (productosTienda[i].price * 3000);
                    }
                	//mxn
                	if(productosTienda[i].moneda == 'MXN$'){
                		finalPrice = (productosTienda[i].price * 148);
                    }
                	//col
                	if(productosTienda[i].moneda == 'COP$'){
                		finalPrice = productosTienda[i].price ;
                    }                	                	
                }
            }
            return finalPrice;
        }; 
        /**
         * calcula el total de la transaccion
         */
        $scope.sumCantidad = function(){
        	var total = 0;
            for(var i = 0 ;  i < $scope.products.length; i++){
                
                    total = total + (($scope.products[i].quantity * $scope.products[i].priceCol) + 
                    					(($scope.products[i].quantity * $scope.products[i].priceCol)*0.19) ) ;
                
            }
            return total;
        };
        
        
        
        
        $scope.message = "Usted no ha realizado ninguna compra aún";
        /**
         * Adicionar productos
         */
        $scope.addProduct =  function(){
            $scope.products.push(  {name: $scope.foundName($scope.product),
            						quantity: $scope.quantity , 
            						value: $scope.foundPrice($scope.product) , 
            						moneda: $scope.foundMoneda($scope.product), 
            						priceCol: $scope.foundPriceCol($scope.product)    });
            $scope.product = "";
            $scope.quantity = 0;
            $scope.value = 0;

        };
        

        



        $scope.removeProduct =  function(productName){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].name == productName){
                    $scope.products.splice(i, 1);
                }
            }
        };

        $scope.buyProducts =  function(){
            //TODO
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products};

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {

                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });


        };



    }


})();
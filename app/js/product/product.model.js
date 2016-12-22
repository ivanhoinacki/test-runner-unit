(function() {
    'use strict';

    angular.module('conta').factory('Product', ProductModel);

    /**
     * @ngdoc factory
     * @name ProductModel
     */
    function ProductModel() {
        /**
         * Defaults
         */
        var defaults = {};

        /**
         * Product Constructor.
         *
         * @param {Object} properties
         * @constructor
         */
        function Product(properties) {}

        /**
         * Public
         */
        angular.extend(Product.prototype, {
            getPriceIncVat: getPriceIncVat,
            setTaxRate: setTaxRate
        });

        /**
         * Return constructor
         */
        return Product;

        /**
         * Get price incl. vat.
         *
         * @returns {Number}
         */
        function getPriceIncVat() {
            return this.price + (this.price * this.taxRate);
        }

        /**
         * Set Tax Rate.
         *
         * @returns {Number}
         */

        function setTaxRate(newtaxRate) {

            if ((typeof newtaxRate === 'number') && (newtaxRate % 1 === 0)) {

                if (newtaxRate > 0) {

                    if (newtaxRate < 100) {
                        return this.taxRate = newtaxRate;
                    } else {
                        throw new Error("input is lower than 100");
                    }
                } else {
                    throw new Error("input is higher than 0");
                }
            } else {
                throw new Error("tax rate is not an integer or float");
            }
        }


    }
}());

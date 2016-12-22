describe('Model: Product', function() {
    var product, model, Product;

    beforeEach(function() {
        module('conta');

        inject(function($injector) {
            Product = $injector.get('Product');
        });

        model = {
            name: 'Beer',
            taxRate: 8.975,
            price: 19.99
        }

        product = new Product(model);
    });

    it('should be an instance of Product', function() {
        expect(product instanceof Product).toBeTruthy();
    });

    describe('on initialization', function() {

        it('should set default values on an empty product', function() {

            product.setTaxRate(15);

            expect(product.taxRate).toBe(15);
        });

        it('should set model on the product', function() {

            product = model;

            expect(product.name).toBe('Beer');
            expect(product.price).toBe(19.99);
            expect(product.taxRate).toBe(8.975);
        });

        it('should override any default values', function() {

            product.setTaxRate(55);

            expect(product.taxRate).toBe(55);
        });

        it('should set default values on the product if they are missing', function() {

            product.name = model.name;
            product.setTaxRate(15);

            expect(product.name).toBe(model.name);
            expect(product.taxRate).toBe(15);
        });

        it('should set and get any unknown attribute', function() {
            var key = 'random' + (new Date()).getTime();

            model[key] = true;
            product = model;

            expect(product[key]).toBeTruthy();
        });
    });

    describe('setTaxRate()', function() {

        it('tax rate is not an integer or float', function() {
            expect(function() {
                product.setTaxRate('023')
            }).toThrowError('tax rate is not an integer or float');
        });

        it('input is higher than 0', function() {
            expect(function() {
                product.setTaxRate(0)
            }).toThrowError('input is higher than 0');
        });

        it('input is lower than 100', function() {
            expect(function() {
                product.setTaxRate(111)
            }).toThrowError('input is lower than 100');
        });
    });

    describe('getPriceIncVat()', function() {
        it('should return the price incl. VAT with two decimals', function() {

            product.price = model.price;
            product.setTaxRate(2);

            expect(product.getPriceIncVat()).toBe(59.97);
        });
    });
});

const SecretHolder = (function(){
    let secrets = new WeakMap();
    return class {
        setSecret(secret){
            secrets.set(this,secret);
        }
        getSecret(){
            return secrets.get(secret);
        }
    }
})();
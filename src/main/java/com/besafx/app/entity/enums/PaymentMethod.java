package com.besafx.app.entity.enums;
public enum PaymentMethod {
    Cash("نقدي"),
    Check("شيك"),
    Later("آجل");
    private String name;
    PaymentMethod(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static PaymentMethod findByName(String name){
        for(PaymentMethod v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static PaymentMethod findByValue(String value){
        for(PaymentMethod v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
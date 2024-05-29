package com.sweteam13.issue_back.common;

public interface ResponseMessage {

    String SUCCESS = "Success";
    String VALIDATION_FAILED = "validation fail";
    String DUPLICATED_NAME = "duplicate name";
    String DUPLICATED_ID = "duplicate id";
    
    String SIGN_IN_FAIL = "sign in fail";
    String AUTHORIZATION_FAIL = "authorization fail";

    String NO_PERMISSION = "no permission";

    String DATABASE_ERROR = "database error";

    
}

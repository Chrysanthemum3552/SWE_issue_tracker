enum ResponseCode {
    SUCCESS = "SU",
    VALIDATION_FAILED = "VF",
    DUPLICATED_NAME = "DN",
    DUPLICATED_ID = "DI",
    
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",

    NO_PERMISSION = "NP",

    DATABASE_ERROR = "DBE"    
}

export default ResponseCode;
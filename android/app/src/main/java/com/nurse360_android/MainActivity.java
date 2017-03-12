package com.nurse360_android;

import com.facebook.react.ReactActivity;
import com.github.yamill.orientation.OrientationPackage;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        SplashScreen.show(this,true);
        return "nurse360_android";
    }
}

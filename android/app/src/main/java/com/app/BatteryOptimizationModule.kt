package com.app

import android.content.Context
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class BatteryOptimizationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryOptimization"
    }

    @ReactMethod
    fun isBatteryOptimized(callback: Callback) {
        val isBatterySaverOn = isBatterySaverOn()
        callback.invoke(isBatterySaverOn)
    }

    private fun isBatterySaverOn(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val powerManager = reactApplicationContext.getSystemService(Context.POWER_SERVICE) as android.os.PowerManager
            return !powerManager.isPowerSaveMode
        }
        return false
    }
}
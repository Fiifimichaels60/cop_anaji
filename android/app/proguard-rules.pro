# Add project specific ProGuard rules here.

# Keep line numbers for stack traces
-keepattributes SourceFile,LineNumberTable,StackTrace

# Capacitor/Android configuration
-keep public class com.getcapacitor.** { *; }
-keep public class com.ionicframework.cordova.webview.** { *; }
-keep public class androidx.appcompat.** { *; }
-keep public class com.google.android.gms.** { *; }

# WebView JS interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# React Native (if applicable)
-keep class com.facebook.react.** { *; }
-keep class org.unimodules.** { *; }

# OkHttp3
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Add rules for any other third-party libraries you're using

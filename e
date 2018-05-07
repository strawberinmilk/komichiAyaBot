


<--- Last few GCs --->

[4435:0x3bcc5a0] 19904284 ms: Mark-sweep 586.3 (593.3) -> 586.2 (593.3) MB, 327.8 / 0.0 ms  allocation failure GC in old space requested
[4435:0x3bcc5a0] 19904609 ms: Mark-sweep 586.2 (593.3) -> 586.0 (593.3) MB, 324.9 / 0.0 ms  allocation failure GC in old space requested
[4435:0x3bcc5a0] 19904946 ms: Mark-sweep 586.0 (593.3) -> 586.0 (590.8) MB, 337.2 / 0.0 ms  last resort
[4435:0x3bcc5a0] 19905278 ms: Mark-sweep 586.0 (590.8) -> 586.0 (590.3) MB, 332.1 / 0.0 ms  last resort


==== JS stack trace =========================================

Security context: 0x1b90a921bbd9 <JS Object>
    1: push(this=0x3690c7fc1c31 <JS Array[75209227]>)
    2: ayayaSay [/home/rinkei/program/komichiAyaBot/index.js:24] [pc=0x136fe9612270](this=0x20b8f1239119 <JS Global Object>)
    3: call [/home/rinkei/program/komichiAyaBot/index.js:33] [pc=0x136fe9611a80](this=0x20b8f1239119 <JS Global Object>)
    4: onTick [/home/rinkei/program/komichiAyaBot/index.js:87] [pc=0x136fe96118d8](this=0x3134159...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
 1: node::Abort() [node]
 2: 0x136849c [node]
 3: v8::Utils::ReportOOMFailure(char const*, bool) [node]
 4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [node]
 5: v8::internal::Factory::NewUninitializedFixedArray(int) [node]
 6: 0xe91d7f [node]
 7: 0xe92695 [node]
 8: v8::internal::JSObject::AddDataElement(v8::internal::Handle<v8::internal::JSObject>, unsigned int, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes, v8::internal::Object::ShouldThrow) [node]
 9: v8::internal::Object::AddDataProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes, v8::internal::Object::ShouldThrow, v8::internal::Object::StoreFromKeyed) [node]
10: v8::internal::Object::SetProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::LanguageMode, v8::internal::Object::StoreFromKeyed) [node]
11: v8::internal::Runtime_SetProperty(int, v8::internal::Object**, v8::internal::Isolate*) [node]
12: 0x136fe92840bd
荳ｭ豁｢ (繧ｳ繧｢繝繝ｳ繝・
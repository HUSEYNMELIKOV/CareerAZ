

Promise.all(window.allFetches)
.finally(() => {
     setTimeout(() => {
          $cc($(".loader-container"), "open", "remove");
          $cc($("html"), "toggle", "remove");
     });
});


/* 
Bu kod parçası vasitəsilə biz bütün JS fayllarında olan fetch ilə baş verən asinxron funksiyaları window üzərindən brauzer tərəfindən ümumi global scope-da saxlaya bilirik. Asinxron funksiyalar normal funksiyalardan Promise ilə fərqlənir. Hər biri bir Promise olduğuna görə Promise.all ilə toplayıb .finally vasitəsilə bütün asinxron cavabların bitdiyi bir scope əldə edirik ki, səhifədəki loader animasiyası yoxa çıxsın.
*/
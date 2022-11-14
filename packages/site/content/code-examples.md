---
title: Code Examples
---

Leave out the lines attribute to display the entire block:

{% ref path="@docs/code/go/example.go" language="go" /%}

Specify a range of lines:

{% ref path="@docs/code/go/example.go" language="go" lines="3-7" /%}

Specify one line:

{% ref path="@docs/code/go/example.go" language="go" lines="2" /%}

Specify scattered lines:

{% ref path="@docs/code/go/example.go" language="go" lines="1-2, 8-9" /%}

# Hello :wave:

I will introduce here all the issues that I've found in the process.

## Which Node version should I use?

<details>
<summary>Description</summary>

If I have a node version in my local that is different from the interviewer, it will have a staged file (`yarn.lock`).

</details>

<details>
<summary>Solution</summary>

I've decided to standarize Node version to **`15.14.0`** using `.nvmrc` and `.tool-versions`

See more here:

- [asdf-vm](http://asdf-vm.com/) (for `.tool-versions`)
- [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)  (for `.nvmrc`)
- [asdf-yarn](https://github.com/twuni/asdf-yarn)

</details>

## I don't know how to handle `.webp` images

<details>
<summary>Description</summary>

Images are loading just fine as a `GET` request, but for some reason HTML can't handle natively these files (and my web explorer is up-to-date, so I don't think it will be related to that case)

</details>

<details>
<summary>Solution</summary>

None :sad:

</details>

## What do I do with `price`?

<details>
<summary>Description</summary>

I can see that `studios` has a numeric value, but it's not related to `price` as a field for `movies`.

</details>

<details>
<summary>Solution</summary>

~~Don't overthink the solution. But, in case that someone says *You should still try to do it*, I've prepared (sort of) a hook that merges both elements (`movies` and `studios`) and then return it as one array of objects (which makes it simpler to query it)~~

Never mind, I've just found out `delete movie['price'];` line in the `api` folder

</details>

## How can I test MUI?


<details>
<summary>Description</summary>

In previous jobs I've used `styled-components` or raw `CSS Modules` and that's pretty much it, so testing was pretty straightforward. But MUI returns `FiberNode` components with a lot of data that I'm not used to see

</details>

<details>
<summary>Solution</summary>

It requires more investigation :hourglass:

</details>
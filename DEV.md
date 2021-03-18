# Publish

1. Change version in package.json
2. Build the plugin `npm run build`
3. Add token to env `set GRAFANA_API_KEY=<my_api_key>` and sign the plugin `npx @grafana/toolkit plugin:sign`

4. Commit changes

5. Create new tag for plugin
    - `git tag -a v0.3.3 -m "release v0.3.3"`
    - `git push origin master --follow-tags`

6. Create new release on Github
7. Rename `dist` folder to `ae3e-plotly-panel-0.3.3` and zip it (Due to current trouble with signature process, move all image to root of `dist` folder and update `plugin.json` accordingly).
8. Generate md5 with command `certutil -hashfile ae3e-plotly-panel-0.3.3.zip MD5`
9. Create `ae3e-plotly-panel-0.3.3.zip.md5` and add following line :
```
94936b31096de4218a9c31f5ab2ab902  ae3e-plotly-panel-0.3.3.zip
```
10. Attach zip and md5 files to release on Github.
11. Test plugin with https://grafana-plugins-web-vgmmyppaka-lz.a.run.app/
12. Publish to Grafana plugins
    - Clone grafana-plugin-repository or update my fork of grafana-plugin-repository (Used https://stefanbauer.me/articles/how-to-keep-your-git-fork-up-to-date)
        - First time only, created the upstream branch 
        `git remote add upstream https://github.com/grafana/grafana-plugin-repository.git`
        - `git fetch upstream`
        - `git merge upstream/master master`
    - Update the `repo.json` file
    - Create a PR

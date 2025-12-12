# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - img "POSPORT" [ref=e6]
      - generic [ref=e9]:
        - heading "Sign In" [level=2] [ref=e11]
        - generic [ref=e12]:
          - generic [ref=e16]:
            - generic [ref=e17]: Email address*
            - generic [ref=e18]:
              - img [ref=e19]
              - textbox "Email address*" [ref=e22]:
                - /placeholder: Enter email address
                - text: crest@gmail.com
          - generic [ref=e25]:
            - generic [ref=e26]: Password
            - generic [ref=e27]:
              - img [ref=e28]
              - textbox "Password" [ref=e31]:
                - /placeholder: Enter password
                - text: "123456"
              - button "toggle password visibility" [ref=e32] [cursor=pointer]:
                - img
          - generic [ref=e34] [cursor=pointer]: Forgot password?
          - button "Sign In" [ref=e35] [cursor=pointer]
  - alert [ref=e36]
```
const React = require('react')
const ampHtmlValidator = require('amphtml-validator')
const Application = require('./Application')
const ampReactRenderer = require('../../../dist/AmpHtmlRenderer.js')

test('render a valid AMP page with amp-vk component', async () => {
  // arrangement
  const AppComponent = <Application />
  const title = 'case - amp-vk'
  const canonical = 'https://amp-vk.test.com.tw'
  const headComponents = [<meta key='test' name='format-detection' content='telephone=no' />]

  // action
  const htmlString = ampReactRenderer({
    entryName: 'amp-vk',
    AppComponent,
    title,
    canonical,
    headComponents
  })

  // assertion
  expect.assertions(2)
  expect(htmlString).toMatchSnapshot()
  const validator = await ampHtmlValidator.getInstance()
  const result = validator.validateString(htmlString)
  console.log('amp validation result: ', result)
  expect(result.status).toEqual('PASS')
})

import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// 기본 스타일과 추가 스타일을 적용합니다.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold my-4" style={{ fontSize: '48px' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-semibold my-3" style={{ fontSize: '36px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-medium my-2" style={{ fontSize: '24px' }}>
        {children}
      </h3>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    // 기본 컴포넌트와 조합
    ...components,
  }
}
